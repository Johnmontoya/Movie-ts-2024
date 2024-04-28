module.exports = {
    '/api/v1/users': {
        get: {
            summary: 'Get all users / obtener todos los usuarios',
            description:
                'Obtener todos los usuarios registrados en la base de datos',
            responses: {
                200: {
                    description: 'Lista todos los usuarios',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/User'
                                }
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
        },
        post: {
            summary:
                'Save user by the admin / Guardar un usuario desde el administrador',
            description: 'Crea un usuario y lo guarda en la base de datos',
            operationId: 'addUser',
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
                    description: 'Usuario creado',
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
    '/api/v1/users/{id}': {
        get: {
            summary: 'Get one user / Obtener un usuario',
            description:
                'Obtiene un usuario de la base de datos por parametro de ID',
            operationId: 'getUser',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID del usuario a eliminar',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Obtiene un usuario por su ID',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User'
                            }
                        }
                    }
                },
                404: {
                    description: 'Usuario no encontrado',
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
        },
        put: {
            summary: 'Update user / actualizar usuario',
            description:
                'Actualiza un usuario de la base de datos por parametro de ID',
            operationId: 'putUser',
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
                            $ref: '#/components/schemas/NewUser'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Datos actualizados',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Success'
                            }
                        }
                    }
                },
                404: {
                    description: 'Usuario no encontrado',
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
        },
        delete: {
            summary: 'Delete user / borrar un usuario',
            description:
                'Elimina un usuario de la base de datos por parametro de ID',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID del usuario a eliminar',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Usuario eliminado',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Success'
                            }
                        }
                    }
                },
                404: {
                    description: 'Usuario no encontrado',
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
