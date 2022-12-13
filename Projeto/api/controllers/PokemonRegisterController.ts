import { Op } from "sequelize";
import { Request, Response, NextFunction } from "express";
import PokemonModel from "../models/PokemonRegister";
import Nature from "../models/Nature";
import User from "../models/User";
class PokemonRegisterController {
  index = async (req: Request, res: Response) => {
    const params = req.query;
    const limit: number = parseInt(params.limit as string) || 100;
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

    if (params.UserId) {
      where.UserId = params.UserId;
    }

    if (params.shiny) {
      where.shiny = params.shiny;
    }

    const pokemon = await PokemonModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]],
      include: [{
        model: Nature,
        required: false,
        attributes: ['name'],
      },
      {
        model: User,
        required: false,
        attributes: ['email', 'name'],
      }]
    });
    res.json(pokemon);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req)
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
      const data = await req.body
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
    const attributes = ["name", "description", "sex", "shiny", "type1", "type2", "species", "ability",
      "move1", "move2", "move3", "move4", "hp", "def", "spdef", "spatk", "speed", "atk", "UserId", "NatureId"];
    const pokemon: any = {};
    console.log(data);

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      pokemon[attribute] = data[attribute];
    }
    return [pokemon];
  };
}

export default new PokemonRegisterController();
