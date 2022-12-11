import express, { Request, Response } from 'express';
import AbilityModel from '../models/Ability';
import AbilityController from '../controllers/AbilityController';
import AuthMiddleware from  '../Middleware/AuthMiddleware'
const routerAbilities = express.Router();

const validateCityId = async (req: Request, res: Response, next: any) => {
    const city = await AbilityModel.findByPk(req.params.abilityId);

    if (!city) {
        return res.status(404).json({ error: 'Ability not found' });
    }

    next();
}

routerAbilities.use(AuthMiddleware.authentication);

routerAbilities.post('/abilities', AbilityController.create);
routerAbilities.get('/abilities', AbilityController.index);
routerAbilities.get('/abilities/:abilityId', validateCityId, AbilityController.show);
routerAbilities.put('/abilities/:abilityId', validateCityId, AbilityController.update);
routerAbilities.delete('/abilities/:abilityId', validateCityId, AbilityController.delete);

export default routerAbilities;
