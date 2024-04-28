import {ICreateUser, IUserPass} from '../interfaces';
import User from '../models/user';

class AuthService {
    /*
        ? Metodo de crear usuario
        * @param: payload => {
            * username: string;
            * email: string;
            * password?: string;}
    */
    async registerUser(payload: ICreateUser) {
        try {
            const data = await User.create(payload);
            return data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /*
        ? Metodo de actualizar la contraseña
        * @param: id: number = id del usuario
        * @param: payload => {
            * password?: string;}
    */
    async updatePassword(userId: number, payload: IUserPass) {
        try {
            const data = await User.update(payload, {
                where: {id: userId}
            });
            return data;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default AuthService;
