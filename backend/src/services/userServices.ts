import {IRegisterUser} from '../interfaces';
import User from '../models/user';

class UserService {
    /*
        ? Metodo de crear usuario por el administrador
        * @param: payload => {
            * username: string;
            * email: string;
            * password?: string;
            * role: number;
            * status: number; }
    */
    async createUser(payload: IRegisterUser) {
        try {
            const newUser = await User.create(payload);
            return newUser;
        } catch (error: any) {
            console.log(error)
            throw new Error(error);
        }
    }

    /*
        ? Metodo de obtener un usuario por email
        * @param: payload => {
            * email: string; }
    */
    async getUserByEmail(email: string) {
        try {
            const data = await User.findOne({where: {email}});
            return data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /*
        ? Metodo de obtener todos los usuarios
        * excluye el atributo password de la respuesta
    */
    async getAllUsers() {
        try {
            const user = await User.findAll({
                attributes: {
                    exclude: ['password']
                }
            });
            return user;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /*
        ? Metodo de obtener un usuario por su ID
        * @param: id: number;
        * excluye el atributo password de la respuesta
    */
    async getByUserId(userId: number) {
        try {
            const data = await User.findByPk(userId, {
                attributes: {
                    exclude: ['password']
                }
            });
            return data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /*
        ? Metodo de actualizar el usuario por ID
        * @param: id: number = id del usuario
        * @param: payload => {
            * username: string;
            * email: string;
            * password?: string;
            * role: number;
            * status: number; }
    */
    async updateUser(userId: number, payload: IRegisterUser) {
        try {
            const data = await User.update(payload, {
                where: {id: userId}
            });
            return data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /*
        ? Metodo de eliminar un usuario por su ID
        * @param: id: number = id del usuario
    */
    async deleteUser(userId: number) {
        try {
            const user = await User.destroy({
                where: {id: userId}
            });
            return user;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default UserService;
