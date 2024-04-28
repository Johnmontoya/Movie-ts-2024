import {Router} from 'express';
import MovieController from '../controllers/Movies';
import LogUser from '../middlewares/auth-require';

const movieRouter = Router();

movieRouter.get('/list', MovieController.getListMovies);
movieRouter.get('/actor/:id', MovieController.getActorInfo);
movieRouter.get('/movie/:id', MovieController.getMovieInfo);
movieRouter.get('/news/:id', MovieController.getMovieNews);
movieRouter.get('/video/:id', LogUser, MovieController.getMovieVideo);

export default movieRouter;
