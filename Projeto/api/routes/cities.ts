import express, { Request, Response } from 'express';
import CityModel from '../models/City';
import citiesController from '../controllers/CitiesController';
import AuthMiddleware from '../Middleware/AuthMiddleware';
const routerCities = express.Router();

const validateCityId = async (req: Request, res: Response, next: any) => {
    const city = await CityModel.findByPk(req.params.cityId);

    if (!city) {
        return res.status(404).json({ error: 'City not found' });
    }

    next();
}
routerCities.use(AuthMiddleware.authentication);

routerCities.post('/cities', citiesController.create);
routerCities.get('/cities', citiesController.index);
routerCities.get('/cities/:cityId', validateCityId, citiesController.show);
routerCities.put('/cities/:cityId', validateCityId, citiesController.update);
routerCities.delete('/cities/:cityId', validateCityId, citiesController.delete);

export default routerCities;
