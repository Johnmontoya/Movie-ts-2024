import {NextFunction, Request, Response} from 'express';
import {get} from 'lodash';
import {ApiError} from '../errors/api-error';

async function isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        // * Recuperamos la informacion del token a traves de la interfaz generada y extendida de request con lodash
        const user: any = get(req, 'token');

        // * Si el role del usuario es distinto a 1, no podrá realizar acciones de nivel administrador
        if (user.role !== 1) {
            throw new ApiError('No tiene permisos para realizar esa acción');
        }

        return next();
    } catch (error: any) {
        next(error);
    }
}

export default isAdmin;
