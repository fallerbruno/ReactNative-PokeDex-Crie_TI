import express, { Request, Response } from 'express';
import PokemonModel from '../models/Pokemon';
import pokemonsController from '../controllers/PokemonController';
const routerPokemons = express.Router();

const validateStateId = async (req: Request, res: Response, next: any) => {
    const pokemon = await PokemonModel.findByPk(req.params.pokemonId);

    if (!pokemon) {
        return res.status(404).json({ error: 'Pokemon not found' });
    }

    next();
}

routerPokemons.post('/pokemons', pokemonsController.create);
routerPokemons.get('/pokemons', pokemonsController.index);
routerPokemons.get('/pokemons/:pokemonId', validateStateId, pokemonsController.show);
routerPokemons.put('/pokemons/:pokemonId', validateStateId, pokemonsController.update);
routerPokemons.delete('/pokemons/:pokemonId', validateStateId, pokemonsController.delete);

export default routerPokemons; 