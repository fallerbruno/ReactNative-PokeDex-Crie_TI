import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User';
import routerUsers from './users';
import routerStates from './states';
import routerCities from './cities';
import routerPokemonsRegister from './pokemonRegister';
import routerPokemons from './pokemon';
import routerAbilities from './abilities';
import routerMoves from './moves';
import routerNatures from './nature';
import routerTypes from './types';
import routerMessage from './messages';
import routerPokemonCanUseMove from './pokemonCanUseMove';
import routerEmail from './email'
const router = express.Router();

// Auth middleware

router.use(cors());
router.use(routerUsers);
router.use(routerStates);
router.use(routerCities);
router.use(routerPokemonsRegister);
router.use(routerAbilities);
router.use(routerMoves);
router.use(routerNatures);
router.use(routerTypes);
router.use(routerPokemons);
router.use(routerMessage);
router.use(routerPokemonCanUseMove);
router.use(routerEmail)
export default router;