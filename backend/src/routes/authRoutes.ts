import {Router} from 'express';
import AuthController from '../controllers/Auth';

const authRouter = Router();

authRouter.post('/login', AuthController.LoginAuth);
authRouter.post('/register', AuthController.registerUser);
authRouter.post('/forgot', AuthController.forgotPassword);
authRouter.post('/reset/:id', AuthController.resetPassword);

export default authRouter;
