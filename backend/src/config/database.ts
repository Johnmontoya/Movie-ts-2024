import {Sequelize} from 'sequelize';
import logger from '../utils/logger';
import {envConfig} from './baseURL';

const isDev = process.env.NODE_ENV === 'development';
const DATABASE: string = envConfig.database as string;
const DATABASE_TEST: string = envConfig.databaseTest as string;

let sequelizeConnection: any;

const dbSync = async () => {
    try {
        if(process.env.NODE_ENV === 'development'){
            sequelizeConnection = new Sequelize(DATABASE)
            await sequelizeConnection.sync({alter: isDev});
        } else {
            sequelizeConnection = new Sequelize(DATABASE_TEST)
            sequelizeConnection.sync({alter: isDev});
        }
        
        return {success: true};
    } catch (error: any) {
        throw new Error(error);
    }
};

dbSync()
    .then(res => {
        logger.info(`Base de datos sincronizada con estado: ${res.success}`);
    })
    .catch(err => {
        logger.error('Falla al sincronizar con la base de datos', err);
    });

export {dbSync};

export default sequelizeConnection;
