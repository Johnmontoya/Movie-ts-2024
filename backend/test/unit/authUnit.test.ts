import request from 'supertest';
import app from '../../src/app';
import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';
import {envConfig} from '../../src/config/baseURL';
import User from '../../src/models/user';
import bcrypt from 'bcrypt';

dotenv.config();
const DATABASE_TEST: string = envConfig.databaseTest as string;
let sequelizeConnection = new Sequelize(DATABASE_TEST);
const passwordhash = bcrypt.hashSync('pacoelflaco', 10);

describe('Auth Controller / Unit testing', () => {
    beforeAll(async () => {
        await User.create({
            username: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: passwordhash,
            role: 1
        });
    });

    it('Deberia validar si el codigo OTP es incorrecto', async () => {
        try {
            const otp = await request(app).post(`/api/v1/users`).send({
                email: 'johnDoe@gmail.com',
                otp: '123456',
                password: 'pacoelflaco',
                confirmNewPassword: 'pacoelflaco'
            });
            expect(otp.statusCode).toBe(404);
            expect(otp.body).toHaveProperty('error');
        } catch (error) {
            expect(error).toMatch('error');
        }
    });

    afterAll(() => {
        User.truncate();
        sequelizeConnection.close();
    });
});
