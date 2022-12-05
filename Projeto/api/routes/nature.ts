import express, { Request, Response } from 'express';
import NatureModel from '../models/Nature';
import naturesController from '../controllers/NatureController';
const routerNatures = express.Router();

const validateCityId = async (req: Request, res: Response, next: any) => {
    const city = await NatureModel.findByPk(req.params.natureId);

    if (!city) {
        return res.status(404).json({ error: 'Nature not found' });
    }

    next();
}

routerNatures.post('/natures', naturesController.create);
routerNatures.get('/natures', naturesController.index);
routerNatures.get('/natures/:natureId', validateCityId, naturesController.show);
routerNatures.put('/natures/:natureId', validateCityId, naturesController.update);
routerNatures.delete('/natures/:natureId', validateCityId, naturesController.delete);

export default routerNatures;
