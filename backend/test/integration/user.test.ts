import request from 'supertest';
import app from '../../src/app';
import dotenv from 'dotenv';
import {describe} from 'node:test';
import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';
import {Sequelize} from 'sequelize';
import {envConfig} from '../../src/config/baseURL';
import User from '../../src/models/user';

dotenv.config();
const DATABASE_TEST: string = envConfig.databaseTest as string;

const passwordhash = bcrypt.hashSync('pacoelflaco', 10);
let login: any;
let usersId: any;
let sequelizeConnection = new Sequelize(DATABASE_TEST);

beforeAll(async () => {
    await User.create({
        username: 'John Doe',
        email: 'johnDoe@gmail.com',
        password: passwordhash,
        role: 1
    });

    const data = User.create({
        username: faker.person.firstName(),
        email: faker.internet.email(),
        password: passwordhash
    });

    usersId = (await data).id;

    login = await request(app).post(`/api/v1/auth/login`).send({
        email: 'johnDoe@gmail.com',
        password: 'pacoelflaco'
    });
});

it('Deberia crear un nuevo usuario y retornar code 201', async () => {
    try {
        const user = await request(app)
            .post(`/api/v1/users`)
            .set('Authorization', `Bearer ${login.body.token}`)
            .send({
                username: faker.person.prefix(),
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

it('Deberia obtener todos los usuarios y retornar code 200', async () => {
    try {
        const user = await request(app).get(`/api/v1/users`);
        expect(user.statusCode).toBe(200);
        expect(user.body).toHaveProperty('users');
    } catch (error) {
        expect(error).toMatch('error');
    }
});

it('Deberia obtener un usuario por su ID y retornar 200', async () => {
    try {
        const user = await request(app).get(`/api/v1/users/${usersId}`);
        console.log(user.body);
        expect(user.statusCode).toBe(200);
        expect(user.body).toHaveProperty('user');
    } catch (error) {
        expect(error).toMatch('error');
    }
});

it('Deberia actualizar los datos del usuario y retornar 201', async () => {
    try {
        // * El nombre de usuario cambiará a un nombre del zodiaco del usuario seleccionado
        const user = await request(app)
            .put(`/api/v1/users/${usersId}`)
            .set('Authorization', `Bearer ${login.body.token}`)
            .send({
                username: faker.person.zodiacSign(),
                email: faker.internet.email()
            });
        console.log(user.body);
        expect(user.statusCode).toBe(201);
        expect(user.body).toHaveProperty('message');
    } catch (error) {
        expect(error).toMatch('error');
    }
});

it('Deberia eliminar un usuario por su ID y retornar 200', async () => {
    try {
        const user = await request(app)
            .delete(`/api/v1/users/${usersId}`)
            .set('Authorization', `Bearer ${login.body.token}`);
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
//"posttest": "npm.cmd run lint",
