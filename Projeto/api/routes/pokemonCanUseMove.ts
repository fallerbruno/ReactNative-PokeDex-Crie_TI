import express, { Request, Response } from 'express';
import PokemonCanUseMoveModel from '../models/PokemonCanUseMove';
import PokemonCanUseMoveController from '../controllers/PokemonCanUseMove';
import AuthMiddleware from '../Middleware/AuthMiddleware';
const routerPokemonCanUseMove = express.Router();

const validateStateId = async (req: Request, res: Response, next: any) => {
    const pokemon = await PokemonCanUseMoveModel.findByPk(req.params.PokemonCanUseMoveId);

    if (!pokemon) {
        return res.status(404).json({ error: 'Pokemon not found' });
    }

    next();
}

routerPokemonCanUseMove.use(AuthMiddleware.authentication);


routerPokemonCanUseMove.post('/pokemonCanUseMove', PokemonCanUseMoveController.create);
routerPokemonCanUseMove.get('/pokemonCanUseMove', PokemonCanUseMoveController.index);
routerPokemonCanUseMove.get('/pokemonCanUseMove/:PokemonCanUseMoveId', validateStateId, PokemonCanUseMoveController.show);
routerPokemonCanUseMove.put('/pokemonCanUseMove/:PokemonCanUseMoveId', validateStateId, PokemonCanUseMoveController.update);
routerPokemonCanUseMove.delete('/pokemonCanUseMove/:PokemonCanUseMoveId', validateStateId, PokemonCanUseMoveController.delete);

export default routerPokemonCanUseMove; 