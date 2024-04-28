import {debug} from 'console';
import app from './app';
import {createServer} from 'http';
import path from 'path';
import fs from 'fs';

// * Ruta de archivo .env
const pathEnv = path.resolve('.env');

if (!fs.existsSync(pathEnv)) {
    throw new Error(
        'Falta env!!!\nCopy / Duplicate ".env.example" root directorio to ".env"'
    );
}

const port = process.env.PORT || 3000;
app.set('port', port);

const server = createServer(app);

// * Mensaje de error de inicio de servidor
function onError(error: {message: string; code: any}) {
    if (error.message !== 'listen') {
        throw error;
    }
}

// * Mensajes de servidor estable
function onListening() {
    const addr = server.address();
    const bind =
        typeof addr === 'string' ? `Pipe ${addr}` : `Port ${addr?.port}`;
    console.log(`Funcionando en ${bind}`);
    debug(`Listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
