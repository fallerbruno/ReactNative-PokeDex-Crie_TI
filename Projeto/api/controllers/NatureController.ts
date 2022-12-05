import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import NatureModel from "../models/Nature";

class NatureController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    const nature = await NatureModel.findAll({});
    res.json(nature);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const natures = await NatureModel.create(data);
      res.json(natures);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    const nature = await NatureModel.findByPk(req.params.natureId);
    res.json(nature);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: any = req.params.natureId;
      const data = await this._validateData(req.body);
      await NatureModel.update(data, {
        where: {
          id: id,
        },
      });
      res.json(await NatureModel.findByPk(id));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await NatureModel.destroy({
      where: {
        id: req.params.natureId,
      },
    });
    res.json({});
  };

  _validateData = async (data: any, id?: any) => {
    const attributes = ['name', 'description', 'accuracy', 'pp', 'condition'];
    const nature: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      nature[attribute] = data[attribute];
    }

    if (await this._checkIfNatureExists(nature.name, id)) {
      throw new Error(`The Nature "${nature.name}" already exists.`);
    }

    return nature;
  }

  _checkIfNatureExists = async (name: string, id?: string) => {
    const where: any = {
      name: name,
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await NatureModel.count({
      where: where,
    });

    return count > 0;
  };
}

export default new NatureController();
