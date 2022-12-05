import { Op } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import MoveModel from '../models/Move';

class MovesController {

  index = async (req: Request, res: Response) => {
    const params = req.query;
    const limit: number = parseInt(params.limit as string) || 100;
    const page: number = parseInt(params.page as string) || 1;
    const offset: number = (page - 1) * limit;
    const sort: any = params.sort || 'id';
    const order: any = params.order || 'ASC';
    const where: any = {};

    if (params.name) {
      where.name =
      {
        [Op.iLike]: `%${params.name}%`
      };
    }

    if (params.accuracy) {
      where.accuracy =
      {
        [Op.gte]: params.min_accuracy
      };
    }

    if (params.max_accuracy) {
      if (!where.accuracy) {
        where.accuracy = {};
      }

      where.accuracy[Op.lte] = params.max_accuracy;
    }

    if (params.pp) {
        where.pp =
        {
          [Op.gte]: params.min_pp
        };
      }
  
      if (params.max_pp) {
        if (!where.pp) {
          where.pp = {};
        }
  
        where.pp[Op.lte] = params.max_pp;
      }
  

    const moves = await MoveModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]]
    });
    res.json(moves);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const user = await MoveModel.create(data);
      res.json(user);
    }
    catch (error: any) {
      res.status(400).json({ error: error.message + "" });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const move = await MoveModel.findByPk(req.params.moveId);
    res.json(move);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.moveId;
      const data = await this._validateData(req.body, id);
      await MoveModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await MoveModel.findByPk(id));
    }
    catch (error: any) {
      res.status(400).json({ error: error.message + "" });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await MoveModel.destroy({
      where: {
        id: req.params.moveid
      }
    });
    res.json({});
  }

  _validateData = async (data: any, id?: any) => {
    const attributes = ['name', 'description', 'accuracy', 'pp', 'condition'];
    const move: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      move[attribute] = data[attribute];
    }

    if (await this._checkIfMoveExists(move.name, id)) {
      throw new Error(`The Move "${move.name}" already exists.`);
    }

    return move;
  }

  _checkIfMoveExists = async (name: string, id?: string) => {
    const where: any =
    {
      name: name
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await MoveModel.count({
      where: where
    });

    return count > 0;
  }

}



export default new MovesController();