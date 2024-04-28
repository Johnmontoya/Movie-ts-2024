import {BASE_URL_SERVER} from '../config/baseURL';
import path from 'path';
import fs from 'fs';

const {NODE_ENV} = process.env;
const ENV = NODE_ENV || 'development';

const baseRoutes = path.resolve('./src/docs');
const getPathRoutes = (path: any) => `${baseRoutes}${path}`;

const getDocs = (basePath: any, getPath: any) => {
    return fs.readdirSync(basePath).reduce((acc, file) => {
        const data = require(getPath(`/${file}`));
        // eslint-disable-next-line no-param-reassign
        acc = {
            ...acc,
            ...data
        };
        return acc;
    }, {});
};

const docsSources = getDocs(baseRoutes, getPathRoutes);

let baseURLServer = [];

if (ENV === 'development') {
    baseURLServer = [
        {
            url: `${BASE_URL_SERVER}`,
            description: `${ENV.toUpperCase()} Server`
        }
    ];
} else {
    baseURLServer = [
        {
            url: `${BASE_URL_SERVER}`,
            description: `${ENV.toUpperCase()} Server`
        }
    ];
}
console.log(baseURLServer)
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'Movies',
            description:
                'Movies API hecho con NodeJS typescript version 20, mysql, sequelize',
            contact: {
                name: 'Movies con Swagger API',
                email: 'johnmontoya777@hotmail.com',
                url: 'https://github.com/Johnmontoya'
            },
            license: {
                name: 'Apache 2.0',
                url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
            }
        },
        servers: baseURLServer,
        paths: docsSources,
        components: {
            schemas: {
                User: {
                    allOf: [
                        {
                            type: 'object',
                            properties: {
                                users: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: {
                                                type: 'integer',
                                                example: 1
                                            },
                                            username: {
                                                type: 'string',
                                                description:
                                                    'Nombre de usuario',
                                                example: 'John Doe'
                                            },
                                            email: {
                                                type: 'string',
                                                description: 'Email de usuario',
                                                example: 'JohnDoe@gmail.com'
                                            },
                                            status: {
                                                type: 'integer',
                                                example: 1
                                            },
                                            role: {
                                                type: 'integer',
                                                example: 1
                                            },
                                            createdAt: {
                                                type: 'date',
                                                example:
                                                    '2024-04-04T19:28:30.000Z'
                                            },
                                            updatedAt: {
                                                type: 'date',
                                                example:
                                                    '2024-04-04T19:28:30.000Z'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                NewUser: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            description: 'Nombre de usuario',
                            nullable: false,
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            description: 'Email de usuario',
                            nullable: false,
                            example: 'JohnDoe@gmail.com'
                        },
                        password: {
                            type: 'string',
                            description: 'Contraseña de usuario',
                            nullable: false
                        },
                        confirmNewPassword: {
                            type: 'string',
                            description: 'Confirmar Contraseña de usuario',
                            nullable: false
                        }
                    }
                },
                AuthLogin: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email de usuario',
                            nullable: false,
                            example: 'JohnDoe@gmail.com'
                        },
                        password: {
                            type: 'string',
                            description: 'Contraseña de usuario',
                            nullable: false
                        }
                    }
                },
                Forgot: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email de usuario',
                            nullable: false,
                            example: 'JohnDoe@gmail.com'
                        }
                    }
                },
                Reset: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email de usuario',
                            nullable: false,
                            example: 'JohnDoe@gmail.com'
                        },
                        otp: {
                            type: 'string',
                            description: 'OTP enviado en el correo',
                            nullable: false,
                            example: '123456'
                        },
                        password: {
                            type: 'string',
                            description: 'Contraseña de usuario',
                            nullable: false
                        },
                        confirmNewPassword: {
                            type: 'string',
                            description: 'Confirmar Contraseña de usuario',
                            nullable: false
                        }
                    }
                },
                Success: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    },
    apis: []
};

export {swaggerOptions};
