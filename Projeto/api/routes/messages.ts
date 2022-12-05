import express, { Request, Response } from 'express';
import MovesModel from '../models/Message';
import movesController from '../controllers/MessageController';
const routerMessage = express.Router();

const validateStateId = async (req: Request, res: Response, next: any) => {
    const pokemon = await MovesModel.findByPk(req.params.messageId);

    if (!pokemon) {
        return res.status(404).json({ error: 'Message not found' });
    }

    next();
}

routerMessage.post('/message', movesController.create);
routerMessage.get('/message', movesController.index);
routerMessage.get('/message/:messageId', validateStateId, movesController.show);
routerMessage.put('/message/:messageId', validateStateId, movesController.update);
routerMessage.delete('/message/:messageId', validateStateId, movesController.delete);

export default routerMessage;