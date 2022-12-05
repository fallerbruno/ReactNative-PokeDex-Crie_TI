import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import AbilityModel from "../models/Ability";

class AbilityController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    const items = await AbilityModel.findAll({});
    res.json(items);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const items = await AbilityModel.create(data);
      res.json(items);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    const item = await AbilityModel.findByPk(req.params.abilityId);
    res.json(item);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: any = req.params.abilityId;
      const data = await this._validateData(req.body);
      await AbilityModel.update(data, {
        where: {
          id: id,
        },
      });
      res.json(await AbilityModel.findByPk(id));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await AbilityModel.destroy({
      where: {
        id: req.params.abilityId,
      },
    });
    res.json({});
  };

  _validateData = async (data: any) => {
    const attributes = ["name", "description"];
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

    const count = await AbilityModel.count({
      where: where,
    });

    return count > 0;
  };
}

export default new AbilityController();
