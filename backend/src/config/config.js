const dotenv = require('dotenv');
dotenv.config();
const {DB_HOST, DB_DATABASE, DB_DATABASE_TEST, DB_TYPE, DB_USERNAME} =
    process.env;

const config = {
    development: {
        username: DB_USERNAME,
        password: '',
        database: DB_DATABASE,
        host: DB_HOST,
        dialect: DB_TYPE
    },
    test: {
        username: DB_USERNAME,
        password: '',
        database: DB_DATABASE_TEST,
        host: DB_HOST,
        dialect: DB_TYPE,
        loggin: false
    },
    production: {
        username: 'root',
        password: '',
        database: 'database_production',
        host: DB_HOST,
        dialect: DB_TYPE
    }
};

module.exports = config;
