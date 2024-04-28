import {Router} from 'express';
import userController from '../controllers/User';
import LogUser from '../middlewares/auth-require';
import isAdmin from '../middlewares/isAdmin';

const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getOneUser);
userRouter.post('/', LogUser, isAdmin, userController.createUser);
userRouter.put('/:id', LogUser, isAdmin, userController.updateUser);
userRouter.delete('/:id', LogUser, userController.deleteUser);

export default userRouter;
