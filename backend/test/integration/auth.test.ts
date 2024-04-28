import request from 'supertest';
import app from '../../src/app';
import {faker} from '@faker-js/faker';
import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';
import {envConfig} from '../../src/config/baseURL';
import User from '../../src/models/user';
import bcrypt from 'bcrypt';

dotenv.config();
const DATABASE_TEST: string = envConfig.databaseTest as string;
let sequelizeConnection = new Sequelize(DATABASE_TEST);
const passwordhash = bcrypt.hashSync('pacoelflaco', 10);

describe('Auth Controller / Integration testing', () => {
    beforeAll(async () => {
        await User.create({
            username: 'John Doe',
            email: 'johnDoe@gmail.com',
            password: passwordhash,
            role: 1
        });
    });

    it('Deberia registrar el nuevo usuario', async () => {
        try {
            const user = await request(app).post(`/api/v1/auth/register`).send({
                username: faker.person.fullName(),
                email: faker.internet.email(),
                password: 'pacoelflaco',
                confirmNewPassword: 'pacoelflaco'
            });
            console.log(user.body);
            expect(user.statusCode).toBe(201);
        } catch (error) {
            expect(error).toMatch('error');
        }
    });

    it('Deberia loguear un usuario y retornar un token', async () => {
        try {
            const user = await request(app).post(`/api/v1/auth/login`).send({
                email: 'johnDoe@gmail.com',
                password: 'pacoelflaco'
            });
            console.log(user.body);
            expect(user.statusCode).toBe(200);
            expect(user.header['authToken']).toBeDefined;
        } catch (error) {
            expect(error).toMatch('error');
        }
    });

    it('Deberia enviar un email para la recuperación de la contraseña', async () => {
        try {
            const user = await request(app).post(`/api/v1/auth/forgot`).send({
                email: 'johnDoe@gmail.com'
            });
            console.log(user.body);
            expect(user.statusCode).toBe(200);
            expect(user.body).toHaveProperty('message');
        } catch (error) {
            expect(error).toMatch('error');
        }
    });

    afterAll(() => {
        User.truncate();
        sequelizeConnection.close();
    });
});
