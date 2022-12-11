import express, { Request, Response } from 'express';
import MovesModel from '../models/Move';
import movesController from '../controllers/MovesController';
import AuthMiddleware from '../Middleware/AuthMiddleware';
const routerMoves = express.Router();

const validateStateId = async (req: Request, res: Response, next: any) => {
    const pokemon = await MovesModel.findByPk(req.params.moveId);

    if (!pokemon) {
        return res.status(404).json({ error: 'Move not found' });
    }

    next();
}

routerMoves.use(AuthMiddleware.authentication);


routerMoves.post('/moves', movesController.create);
routerMoves.get('/moves', movesController.index);
routerMoves.get('/moves/:moveId', validateStateId, movesController.show);
routerMoves.put('/moves/:moveId', validateStateId, movesController.update);
routerMoves.delete('/moves/:moveId', validateStateId, movesController.delete);

export default routerMoves;