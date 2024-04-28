'use strict';
const {faker} = require('@faker-js/faker');
const bcrypt = require('bcrypt');

function generateFakeUsers(count) {
    const users = [];
    for (let i = 0; i < count; i++) {
        const user = {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync(faker.internet.userName(), 10)
        };
        users.push(user);
    }
    return users;
}

// Genera 10 usuarios ficticios
const fakeUsers = generateFakeUsers(5);
//console.log(fakeUsers);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        return await queryInterface.bulkInsert('Users', fakeUsers);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
