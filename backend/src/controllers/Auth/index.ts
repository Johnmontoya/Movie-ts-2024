import {NextFunction, Request, Response} from 'express';
import UserService from '../../services/userServices';
import AuthService from '../../services/authServices';
import {ApiError} from '../../errors/api-error';
import {sign} from '../../utils/jwt';
import {omit} from 'lodash';
import {compareAsync, encryptAsync} from '../../utils/encrypt';
import {StatusCodes} from 'http-status-codes';
import schemaUser from '../User/schemaUser';
import {generateOTP, verifyOTP} from '../../utils/otp';
import {sendOTP} from '../../utils/mail/mailHelper';

const usuarioService = new UserService();
const authServices = new AuthService();

async function LoginAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const {email, password} = req.body;

        const user = await usuarioService.getUserByEmail(email);
        if (!user) {
            throw new ApiError('Email no encontrado');
        }

        const validPassword = compareAsync(password, user.password);
        if (!validPassword) {
            throw new ApiError('Contraseña incorrecta');
        }

        const userData = omit(user?.toJSON(), ['password', 'status']);
        const accessToken = sign({...userData});

        res.status(StatusCodes.OK).header('authToken', accessToken).json({
            error: false,
            token: accessToken,
            message: 'Bienvenido'
        });
    } catch (error) {
        next(error);
    }
}

async function registerUser(req: Request, res: Response, next: NextFunction) {
    try {
        const {username, email, password, confirmNewPassword} = req.body;

        await schemaUser.createUser.validate(
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
            password: encryptAsync(password)
        };

        await authServices.registerUser(payload);
        res.status(StatusCodes.CREATED).json({
            message:
                'Bienvenido, a su cuenta de correo se ha enviado un email de verificación'
        });
    } catch (error: any) {
        next(error);
    }
}

async function forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
        const {email} = req.body;

        const user = await usuarioService.getUserByEmail(email);
        if (!user) {
            throw new ApiError('Email no encontrado');
        }

        const data = omit(user?.toJSON(), [
            'password',
            'role',
            'status',
            'createdAt',
            'updatedAt'
        ]);

        const otp = generateOTP(data.email);

        const send = await sendOTP(data, otp);

        if (!send) {
            throw new ApiError('OTP no generado');
        }

        res.status(StatusCodes.OK).json({
            message: 'Email enviado correctamente!',
            error: false
        });
    } catch (error: any) {
        next(error);
    }
}

async function resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
        const {email, otp, password, confirmNewPassword} = req.body;

        const user = await usuarioService.getUserByEmail(email);
        if (!user) {
            throw new ApiError('Email no encontrado');
        }

        const data = user?.toJSON();

        const isValid = verifyOTP(data.email, otp);

        if (!isValid) {
            throw new ApiError('El OTP es incorrecto');
        }

        await schemaUser.updatePassword.validate(
            {
                email,
                password,
                confirmNewPassword
            },
            {
                strict: true
            }
        );

        const payload = {password: encryptAsync(password)};

        const updated = await authServices.updatePassword(user.id, payload);

        res.status(StatusCodes.OK).json({
            message: updated[0]
                ? 'Contraseña cambiada correctamente'
                : 'Falla al cambiar la contraseña',
            error: false
        });
    } catch (error: any) {
        next(error);
    }
}

export default {
    LoginAuth,
    registerUser,
    forgotPassword,
    resetPassword
};
