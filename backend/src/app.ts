import express from 'express';
import appRouter from './routes';
import {config} from 'dotenv-safe';
import {MiddlewareError} from './middlewares/error-handler';
import swaggerUi from 'swagger-ui-express';
import {swaggerOptions} from './docs/swagger';
import swaggerJSDoc from 'swagger-jsdoc';
import Authenticate from './middlewares/deserializer-auth';

// * No permitir valores nulos en .env
config({
    path: '.env',
    allowEmptyValues: false
});

const app = express();

// * Ejecución de swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// * Middleware de permisos de usuario para realizar acciones
app.use(Authenticate);

// * Rutas de la plataforma y swagger
app.use('/api/v1', appRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// * Middleware de manipulacion de errores
app.use(MiddlewareError.handler);

export default app;
