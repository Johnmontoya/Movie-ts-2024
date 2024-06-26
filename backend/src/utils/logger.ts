import winston from 'winston';

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
        }),
        new winston.transports.File({
            filename: 'debug.log',
            level: 'debug'
        })
    ]
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== 'production') {
    logger.debug('Sistema inicializado al nivel de prueba');
}

export default logger;
