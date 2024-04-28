import request from 'supertest';
import app from '../../src/app';
import User from '../../src/models/user';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {envConfig} from '../../src/config/baseURL';
import {Sequelize} from 'sequelize';
import { faker } from '@faker-js/faker';

dotenv.config();
const DATABASE_TEST: string = envConfig.databaseTest as string;

const passwordhash = bcrypt.hashSync('pacoelflaco', 10);
let login: any;
let token: any;
let sequelizeConnection = new Sequelize(DATABASE_TEST);

describe('User Controller / Unit testing', () => {
    beforeAll(async () => {
        await User.create({
            username: 'John Doe',
            email: 'johnDoe2@gmail.com',
            password: passwordhash,
            role: 1
        });
    
        login = await request(app).post(`/api/v1/auth/login`).send({
            email: 'johnDoe2@gmail.com',
            password: 'pacoelflaco'
        });
        token = login.body.token;
    });
    
    it('Deberia validar si el campo del nombre de usuario esta vacio', async () => {
        try {
            const data = await request(app)
                .post(`/api/v1/users`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    username: '',
                    email: 'paco@gmail.com',
                    password: passwordhash,
                    confirmNewPassword: passwordhash
                });
            expect(data.statusCode).toBe(400);
            expect(data.body).toHaveProperty('error');
        } catch (error) {
            expect(error).toMatch('error');
        }
    });

    it('Deberia validar si el campo del email de usuario esta vacio', async () => {
        try {
            const data = await request(app)
                .post(`/api/v1/users`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    username: 'Paco',
                    email: ''
                });
            expect(data.statusCode).toBe(400);
            expect(data.body).toHaveProperty('error');
        } catch (error) {
            expect(error).toMatch('error');
        }
    });
    
    it('Deberia validar si el campo de la contraseña de usuario esta vacio', async () => {
        try {
            const data = await request(app)
                .post(`/api/v1/users`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    username: 'Paco',
                    email: 'paco@gmail.com',
                    password: ''
                });
            expect(data.statusCode).toBe(400);
            expect(data.body).toHaveProperty('error');
        } catch (error) {
            expect(error).toMatch('error');
        }
    });
    
    it('Deberia validar si las contraseñas coinciden antes de guardar', async () => {
        try {
            const data = await request(app)
                .post(`/api/v1/users`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    username: 'Paco',
                    email: 'paco@gmail.com',
                    password: 'pacoelflaco',
                    confirmNewPassword: 'elflaco'
                });
            expect(data.statusCode).toBe(400);
            expect(data.body).toHaveProperty('error');
        } catch (error) {
            expect(error).toMatch('error');
        }
    });
    
    it('Deberia validar si la contraseña se esta encryptando antes de guardar', async () => {
        try {
            const data = User.create({
                username: faker.person.firstName(),
                email: faker.internet.email(),
                password: passwordhash
            });
    
            const userPass = (await data).password;
    
            // * Comprobar si la contraseña encriptada es válida
            const esValida = await bcrypt.compareSync('pacoelflaco', userPass);
    
            // * Comprobar si la contraseña encriptada es válida
            expect(esValida).toBe(true);
        } catch (error) {
            expect(error).toMatch('error');
        }
    });
    
    it('Deberia validar si la dirección de email es valida', async () => {
        try {
            const data = await request(app)
                .post(`/api/v1/users`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    username: 'Paco',
                    email: 'pacogmail.com'
                });
            expect(data.statusCode).toBe(400);
            expect(data.body).toHaveProperty('error');
        } catch (error) {
            expect(error).toMatch('error');
        }
    });
    
    it('Deberia validar que el usuario existe en la base de datos', async () => {
        try {
            const data = await request(app)
                .post(`/api/v1/users`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    username: 'John Doe',
                    email: 'johnDoe2@gmail.com',
                    password: passwordhash,
                    confirmNewPassword: passwordhash
                });
            expect(data.statusCode).toBe(404);
            expect(data.body).toHaveProperty('error');
        } catch (error) {
            expect(error).toMatch('error');
        }
    });
    
    afterAll(() => {
        User.truncate();
        sequelizeConnection.close();
    });
});
