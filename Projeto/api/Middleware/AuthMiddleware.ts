import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

class AuthMiddleware {
    authentication = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let authorization = req.headers.authorization as string;

            if (!authorization || authorization.indexOf('Basic ') === -1) {
                return res.status(401).json({ message: 'Missing Authorization Header' });
            }

            authorization = authorization.replace('Basic ', '');
            let ascii = Buffer.from(authorization, 'base64').toString('ascii');
            let data = ascii.split(":");

            let username = data[0];
            let password = data[1];

            let user = await User.locateUser(username, password);

            if (!user) {
                return res.status(401).json({ message: 'Invalid Authentication Credentials' });
            }

            if (req.path === '/auth' || req.path === '/verify') {
                return res.json(user);
            } else {
                next();
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message as string });
        }
    }
}

export default new AuthMiddleware();