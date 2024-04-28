import {NextFunction, Request, Response} from 'express';
import MoviesServices from '../../services/moviesServices';
import {StatusCodes} from 'http-status-codes';

const moviesServices = new MoviesServices();

async function getListMovies(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.query.searchTerm;
        const data = await moviesServices.getMovies(query);
        res.status(StatusCodes.OK).json({
            movies: data
        });
    } catch (error: any) {
        next(error);
    }
}

async function getActorInfo(req: Request, res: Response, next: NextFunction) {
    try {
        const actorId = req.params.id;
        const data = await moviesServices.getActorDetails(actorId);
        res.status(StatusCodes.OK).json({
            actor: data
        });
    } catch (error: any) {
        next(error);
    }
}

async function getMovieInfo(req: Request, res: Response, next: NextFunction) {
    try {
        const movieId = req.params.id;
        const data = await moviesServices.getMovieInfo(movieId);
        res.status(StatusCodes.OK).json({
            movie: data
        });
    } catch (error: any) {
        next(error);
    }
}

async function getMovieNews(req: Request, res: Response, next: NextFunction) {
    try {
        const movieId = req.params.id;
        const data = await moviesServices.newsMovies(movieId);
        res.status(StatusCodes.OK).json({
            news: data
        });
    } catch (error: any) {
        next(error);
    }
}

async function getMovieVideo(req: Request, res: Response, next: NextFunction) {
    try {
        const movieId = req.params.id;
        const data = await moviesServices.getMovieVideo(movieId);
        res.status(StatusCodes.OK).json({
            video: data
        });
    } catch (error: any) {
        next(error);
    }
}

export default {
    getListMovies,
    getActorInfo,
    getMovieInfo,
    getMovieNews,
    getMovieVideo
};
