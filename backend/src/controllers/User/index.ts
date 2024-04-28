import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import UserService from '../../services/userServices';
import schema from './schemaUser';
import {encryptAsync} from '../../utils/encrypt';
import {ApiError} from '../../errors/api-error';

const usuarioService = new UserService();

async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const {username, email, password, confirmNewPassword, role, status} =
            req.body;

        await schema.createUser.validate(
            {
                username,
                email,
                password,
                confirmNewPassword
            },
            {
                strict: true
            }
        );

        const isEmailExists = await usuarioService.getUserByEmail(email);
        if (isEmailExists) {
            throw new ApiError('El email ya esta en uso');
        }

        const payload = {
            username: username,
            email: email,
            password: encryptAsync(password),
            role: role,
            status: status
        };

        await usuarioService.createUser(payload);
        res.status(StatusCodes.CREATED).json({
            message: 'Nuevo usuario creado'
        });
    } catch (error: any) {
        next(error);
    }
}

async function getOneUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = parseInt(req.params.id);
        const user = await usuarioService.getByUserId(userId);
        if (!user) {
            throw new ApiError('Usuario no encontrado');
        }
        res.status(StatusCodes.OK).json({
            user: user
        });
    } catch (error: any) {
        next(error);
    }
}

async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await usuarioService.getAllUsers();
        res.status(StatusCodes.OK).json({
            users: users
        });
    } catch (error: any) {
        next(error);
    }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = parseInt(req.params.id);
        const {username, email, role, status} = req.body;

        await schema.updateUser.validate(
            {
                username,
                email
            },
            {
                strict: true
            }
        );

        const user = await usuarioService.getByUserId(userId);
        if (!user) {
            throw new ApiError('Usuario no encontrado');
        }

        const payload = {
            username: username,
            email: email,
            role: role,
            status: status
        };

        await usuarioService.updateUser(userId, payload);
        res.status(StatusCodes.CREATED).json({
            message: 'Datos actualizados'
        });
    } catch (error: any) {
        next(error);
    }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = parseInt(req.params.id);

        const user = await usuarioService.getByUserId(userId);
        if (!user) {
            throw new ApiError('Usuario no encontrado');
        }

        await usuarioService.deleteUser(userId);
        res.status(StatusCodes.OK).json({
            message: 'Usuario eliminado'
        });
    } catch (error: any) {
        next(error);
    }
}

export default {
    createUser,
    getOneUser,
    getUsers,
    updateUser,
    deleteUser
};
