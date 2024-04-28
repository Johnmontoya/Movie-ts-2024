//@typescript-eslint/ban-ts-comment
import dotenv from 'dotenv';
dotenv.config({path: '.env'});

const URL_SERVER = {
    development: `http://localhost:${process.env.PORT || 3000}`,
    test: `http://localhost:${process.env.PORT || 3000}`,
    staging: 'https://staging.example.com',
    production: 'https://example.com'
};

export const envConfig = {
    host: process.env.HOST_URL,
    port: process.env.PORT,
    database: process.env.DATABASE,
    databaseTest: process.env.DATABASE_TEST,
    stripeSecret: process.env.STRIPE_KEY_SECRET,
    rapidKey: process.env.X_RAPID_API_KEY
};

let ENV = process.env.NODE_ENV || 'development';
// @ts-ignore
const BASE_URL_SERVER = URL_SERVER[ENV];

export {BASE_URL_SERVER};
