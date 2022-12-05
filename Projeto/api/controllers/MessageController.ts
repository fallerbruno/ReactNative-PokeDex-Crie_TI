import { Op } from "sequelize";
import { Request, Response, NextFunction } from "express";
import MessageModel from "../models/Message";
import UserModel from "../models/User";

class MessageController {
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

    if (params.from) {
      where.from = {
        [Op.iLike]: `%${params.from}%`,
      };
    }

    if (params.read) {
      where.read = {
        [Op.iLike]: `%${params.read}%`,
      };
    }

    const massages = await MessageModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]],
      include: [
        {
          model: UserModel,
          as: "recipient",
          attributes: ["id", "name"],
        },
        {
          model: UserModel,
          as: "sender",
          attributes: ["id", "name"],
        },
      ],
    });
    res.json(massages);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const message = await MessageModel.create(data);
      res.json(message);
    } catch (error: any) {
      res.status(400).json({ error: error.message + "" });
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    const move = await MessageModel.findByPk(req.params.messageId);
    res.json(move);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.moveId;
      const data = await this._validateData(req.body, id);
      await MessageModel.update(data, {
        where: {
          id: id,
        },
      });
      res.json(await MessageModel.findByPk(id));
    } catch (error: any) {
      res.status(400).json({ error: error.message + "" });
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await MessageModel.destroy({
      where: {
        id: req.params.Messageid,
      },
    });
    res.json({});
  };

  _validateData = async (data: any, id?: any) => {
    const attributes = ["subject", "read", "message"];
    const message: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      message[attribute] = data[attribute];
    }

    return message;
  };
}

export default new MessageController();
