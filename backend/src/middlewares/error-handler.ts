/* eslint-disable no-unused-vars */
import {isCelebrateError} from 'celebrate';
import {Request, Response, NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';
import {ValidationError} from 'sequelize';
import {ValidationError as YupError} from 'yup';
import {ApiError} from '../errors/api-error';
import {
    JsonWebTokenError,
    NotBeforeError,
    TokenExpiredError
} from 'jsonwebtoken';

// * validacion de cada error
class ErrorHandler {
    public async handler(
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (err instanceof ValidationError) {
            const errors = err.errors.map(value => value.message);
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({error: errors.toString()});
        }

        if (err instanceof YupError) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({error: err.message});
        }

        if (isCelebrateError(err)) {
            const errors = Array.from(
                err.details,
                ([, value]) => value.message
            );
            return res
                .status(StatusCodes.UNPROCESSABLE_ENTITY)
                .json({error: errors});
        }

        if (err instanceof RangeError) {
            return res
                .status(StatusCodes.UNPROCESSABLE_ENTITY)
                .json({error: err.message});
        }

        if (err instanceof ApiError) {
            return res.status(StatusCodes.NOT_FOUND).json({error: err.message});
        }

        if (err instanceof TokenExpiredError) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({error: 'El inicio de sesión ha expirado'});
        }

        if (err instanceof JsonWebTokenError) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({error: 'Debe loguear para realizar esa acción'});
        }

        if (err instanceof NotBeforeError) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({error: 'Un token es requerido'});
        }

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: 'Ha ocurrido un error inesperado.'});
    }
}

export const MiddlewareError = new ErrorHandler();
