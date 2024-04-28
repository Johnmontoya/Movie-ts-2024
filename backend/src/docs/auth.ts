module.exports = {
    '/api/v1/auth/register': {
        post: {
            summary: 'Save user of client / Guarda el usuario',
            description: 'Creaun usuario y lo guarda en la base de datos',
            operationId: 'addAuth',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/NewUser'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description:
                        'Mensaje de Bienvenida y correo de verificación',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Success'
                            }
                        }
                    }
                },
                404: {
                    description: 'Validaciones Yup o Sequelize',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },
                500: {
                    description: 'Error internal server',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/v1/auth/login': {
        post: {
            summary: 'Login user / inicio de sesion',
            description:
                'Inicio de sesion con credenciales de email y contraseña',
            operationId: 'loginUser',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/AuthLogin'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Mensaje de Bienvenida',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Success'
                            }
                        }
                    }
                },
                404: {
                    description: 'Email o contraseña incorrectos',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },
                500: {
                    description: 'Error internal server',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/v1/auth/forgot': {
        post: {
            summary: 'Forgot password / Recuperacion de contraseña',
            description:
                'Envia un email guardado y recibe un correo con un OTP para cambiar la contraseña',
            operationId: 'forgotUser',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Forgot'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Email enviado correctamente!',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Success'
                            }
                        }
                    }
                },
                400: {
                    description: 'Email no encontrado u OTP no generado',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },
                500: {
                    description: 'Error internal server',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/v1/auth/reset/{id}': {
        post: {
            summary: 'Reset password / Cambiar la contraseña',
            description: 'Cambio de contraseña con email, otp y contraseña',
            operationId: 'resetPass',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID del usuario a actualizar',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Reset'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description:
                        'Contraseña cambiada correctamente ó Fallo al cambiar la contrasñea',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Success'
                            }
                        }
                    }
                },
                404: {
                    description: 'Email no encontrado u OTP es incorrecto',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },
                500: {
                    description: 'Error internal server',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                }
            }
        }
    }
};
