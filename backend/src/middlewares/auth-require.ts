import {Request, Response, NextFunction} from 'express';
import {get} from 'lodash';
import {ApiError} from '../errors/api-error';

async function LogUser(req: Request, res: Response, next: NextFunction) {
    try {
        // * Recuperamos la informacion del token a traves de la interfaz generada y extendida de request con lodash
        const user: any = get(req, 'token');
        //console.log('token', user)

        if (!user) {
            throw new ApiError('El token de usuario no existe');
        }

        //const data = await usuarioServices.getByUserId(user.id);
        //const tokenId = data?.toJSON();

        return next();
    } catch (error: any) {
        next(error);
    }
}

export default LogUser;
