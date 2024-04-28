'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: new Sequelize.STRING(30),
                allowNull: false,
                unique: {
                    name: 'Email_index_unique',
                    msg: 'El email ya esta en uso'
                }
            },
            password: {
                type: new Sequelize.STRING(128),
                allowNull: true
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 1
            },
            role: {
                type: Sequelize.INTEGER,
                defaultValue: 2
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Users');
    }
};
