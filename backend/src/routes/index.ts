import {Router} from 'express';
import userRouter from './userRoutes';
import authRouter from './authRoutes';
import movieRouter from './moviesRoutes';
import paymentRouter from './paymentRoutes';

const appRouter = Router();

const appRoutes = [
    {
        path: '/users',
        router: userRouter
    },
    {
        path: '/auth',
        router: authRouter
    },
    {
        path: '/movies',
        router: movieRouter
    },
    {
        path: '/payment',
        router: paymentRouter
    }
];

/*
 * recorre el array y usa las rutas
 */
appRoutes.forEach(route => {
    appRouter.use(route.path, route.router);
});

export default appRouter;
