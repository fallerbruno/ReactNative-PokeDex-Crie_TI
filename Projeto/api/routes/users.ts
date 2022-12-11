import express, { Request, Response } from 'express';
import UserModel from '../models/User';
import usersController from '../controllers/UsersController';
import AuthMiddleware from '../Middleware/AuthMiddleware';

const routerUsers = express.Router();

const validateUserId = async (req: Request, res: Response, next: any) => {
  const user = await UserModel.findByPk(req.params.userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  next();
}

routerUsers.get('/users', usersController.index);
routerUsers.post('/users', usersController.create);
routerUsers.get('/users/:userId',AuthMiddleware.authentication, validateUserId, usersController.show);
routerUsers.put('/users/:userId', validateUserId, usersController.update);
routerUsers.delete('/users/:userId',AuthMiddleware.authentication, validateUserId, usersController.delete);

export default routerUsers;