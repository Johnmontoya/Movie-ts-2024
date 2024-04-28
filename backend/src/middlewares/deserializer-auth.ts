import {Request, Response, NextFunction} from 'express';
import {get} from 'lodash';
import {verify} from '../utils/jwt';
import {JwtPayload} from 'jsonwebtoken';
import {StatusCodes} from 'http-status-codes';

// * Request personalizado extendido para agregar la variable token
export interface CustomRequest extends Request {
    token: string | JwtPayload | null;
}

async function Authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        // * Obtenemos la información de el header authorization
        const bearerToken = get(req, 'headers.authorization');
        let token = bearerToken;

        // * evaluamos si la informacion del header authorization empieza con un Bearer
        if (bearerToken && bearerToken.startsWith('Bearer ')) {
            // * Eliminamos la palabra Bearer y el espacio que le sigue
            token = bearerToken.substring(7);
        }
        // * Si no obtenemos nada, enviamos un error
        if (!token) return next();

        // * Enviamos el token, al metodo verify y nos retorna unas constantes
        const {decoded, expired, valid} = verify(token);

        /*
         * Si la validacion es verdadera y el expired es verdadero,
         *almacenamos la informacion decodificada del usuario en el metodo Request de express
         */
        if (valid && !expired) {
            //req.user = decoded;
            (req as CustomRequest).token = decoded;
            return next();
        } else {
            return res.status(StatusCodes.FORBIDDEN).json({
                error: true
            });
        }
    } catch (error: any) {
        next(error);
    }
}

export default Authenticate;
