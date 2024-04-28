/* eslint-disable no-undef */
import {envConfig} from '../config/baseURL';

const X_RAPID_API_KEY: string = envConfig.rapidKey as string;

class MoviesServices {
    /*
        ? Metodo de obtener las peliculas
        * @param: query: string 
    */
    async getMovies(query: any) {
        try {
            const url = `https://imdb146.p.rapidapi.com/v1/find/?query=${query}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': X_RAPID_API_KEY!,
                    'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /*
        ? Metodo de card informacion para el HTML
        * @param: id: number = id de la pelicula
    */
    async newsMovies(movieId: string) {
        try {
            const url = `https://imdb146.p.rapidapi.com/v1/news/?id=${movieId}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': X_RAPID_API_KEY!,
                    'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /*
        ? Metodo de detalles de la pelicula
        * @param: id: number = id de la pelicula
    */
    async getMovieInfo(movieId: string) {
        try {
            const url = `https://imdb146.p.rapidapi.com/v1/title/?id=${movieId}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': X_RAPID_API_KEY!,
                    'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /*
        ? Metodo de información del actor
        * @param: id: number = id del actor
    */
    async getActorDetails(movieId: string) {
        try {
            const url = `https://imdb146.p.rapidapi.com/v1/name/?id=${movieId}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': X_RAPID_API_KEY!,
                    'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /*
        ? Metodo de los trailers y videos
        * @param: id: number = id de la pelicula
    */
    async getMovieVideo(movieId: string) {
        try {
            const url = `https://imdb146.p.rapidapi.com/v1/video/?id=${movieId}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': X_RAPID_API_KEY!,
                    'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default MoviesServices;
