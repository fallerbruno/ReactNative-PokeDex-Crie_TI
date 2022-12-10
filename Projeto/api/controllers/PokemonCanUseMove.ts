import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import PokemonCanUseMove from "../models/PokemonCanUseMove";
import MoveModel from '../models/Move';

class PokemonCanUseMoveController {
  index = async (req: Request, res: Response, next: NextFunction) => {
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

    const items = await PokemonCanUseMove.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]],
      include: [{
        model: MoveModel,
        required: false,
        attributes: ['name'],
    }]
    });
    res.json(items);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await (req.body);
      const items = await PokemonCanUseMove.create(data);
      res.json(items);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    const item = await PokemonCanUseMove.findByPk(req.params.PokemonCanUseMoveId);
    res.json(item);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: any = req.params.PokemonCanUseMoveId;
      const data = await this._validateData(req.body);
      await PokemonCanUseMove.update(data, {
        where: {
          id: id,
        },
      });
      res.json(await PokemonCanUseMove.findByPk(id));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await PokemonCanUseMove.destroy({
      where: {
        id: req.params.PokemonCanUseMoveId,
      },
    });
    res.json({});
  };

  _validateData = async (data: any) => {
    const attributes = ["name"];
    const Item: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      Item[attribute] = data[attribute];
    }

    return Item;
  };

}

export default new PokemonCanUseMoveController();
