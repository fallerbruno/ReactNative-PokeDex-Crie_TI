import express, { Request, Response } from 'express';
import PokemonModel from '../models/PokemonRegister';
import pokemonsController from '../controllers/PokemonRegisterController';
import AuthMiddleware from '../Middleware/AuthMiddleware';
const routerPokemonsRegister = express.Router();

const validateStateId = async (req: Request, res: Response, next: any) => {
    const pokemon = await PokemonModel.findByPk(req.params.pokemonId);

    if (!pokemon) {
        return res.status(404).json({ error: 'Pokemon not found' });
    }

    next();
}

routerPokemonsRegister.use(AuthMiddleware.authentication);


routerPokemonsRegister.post('/pokemonsRegister', pokemonsController.create);
routerPokemonsRegister.get('/pokemonsRegister', pokemonsController.index);
routerPokemonsRegister.get('/pokemonsRegister/:pokemonId', validateStateId, pokemonsController.show);
routerPokemonsRegister.put('/pokemonsRegister/:pokemonId', validateStateId, pokemonsController.update);
routerPokemonsRegister.delete('/pokemonsRegister/:pokemonId', validateStateId, pokemonsController.delete);

export default routerPokemonsRegister; 