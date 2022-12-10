import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import TypeModel from "../models/Type";

class TypeController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    const items = await TypeModel.findAll({});
    res.json(items);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const items = await TypeModel.create(data);
      res.json(items);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    const item = await TypeModel.findByPk(req.params.itemId);
    res.json(item);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: any = req.params.itemId;
      const data = await this._validateData(req.body);
      await TypeModel.update(data, {
        where: {
          id: id,
        },
      });
      res.json(await TypeModel.findByPk(id));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await TypeModel.destroy({
      where: {
        id: req.params.itemId,
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

  _checkIfItemExists = async (name: string, id?: string) => {
    const where: any = {
      name: name,
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await TypeModel.count({
      where: where,
    });

    return count > 0;
  };
}

export default new TypeController();
