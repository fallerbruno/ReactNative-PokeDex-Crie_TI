import express, { Request, Response } from 'express';
import TypesModel from '../models/Type';
import typesController from '../controllers/TypeController';
const routerTypes= express.Router();

const validateStateId = async (req: Request, res: Response, next: any) => {
    const state = await TypesModel.findByPk(req.params.typeId);

    if (!state) {
        return res.status(404).json({ error: 'Type not found' });
    }

    next();
}

routerTypes.post('/types', typesController.create);
routerTypes.get('/types', typesController.index);
routerTypes.get('/types/:typeId', validateStateId, typesController.show);
routerTypes.put('/types/:typeId', validateStateId, typesController.update);
routerTypes.delete('/types/:typeId', validateStateId, typesController.delete);

export default routerTypes;