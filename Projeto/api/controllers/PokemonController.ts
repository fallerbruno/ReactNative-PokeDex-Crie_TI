import { Op } from "sequelize";
import { Request, Response, NextFunction } from "express";
import PokemonModel from "../models/Pokemon";

class PokemonController {
  index = async (req: Request, res: Response) => {
    const params = req.query;
    const limit: number = parseInt(params.limit as string) || 1000;
    const page: number = parseInt(params.page as string) || 1;
    const offset: number = (page - 1) * limit;
    const sort: any = params.sort || "id";
    const order: any = params.order || "ASC";
    const where: any = {};

    if (params.name) {
      where.name = {
        [Op.iLike]: `%${params.name}%`,
      };
    }

    if (params.sex) {
      where.sex = params.sex;
    }

    if (params.shiny) {
      where.shiny = params.shiny;
    }

    const pokemon = await PokemonModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]],
    });
    res.json(pokemon);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: any = req.body;
      const user = await PokemonModel.create(data);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message + "" });
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    const pokemon = await PokemonModel.findByPk(req.params.pokemonId);
    res.json(pokemon);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.pokemonId;
      const data = await this._validateData(req.body, id);
      await PokemonModel.update(data, {
        where: {
          id: id,
        },
      });
      res.json(await PokemonModel.findByPk(id));
    } catch (error: any) {
      res.status(400).json({ error: error.message + "" });
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await PokemonModel.destroy({
      where: {
        id: req.params.pokemonId,
      },
    });
    res.json({});
  };

  _validateData = async (data: any, id?: any) => {
    const attributes = ["name", "description", "sprite","spriteShiny", "type1", "type2", "species", "abilityHidden",
       "abilityNormal", "hp", "def", "spdef", "spatk", "speed", "atk" ]
    const pokemon: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      pokemon[attribute] = data[attribute];
    }
    return [pokemon];
  };
}

export default new PokemonController();
