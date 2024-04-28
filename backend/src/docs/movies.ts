module.exports = {
    '/api/v1/movies/list': {
        get: {
            summary: 'Get all movies / Obtener todas las peliculas',
            description: 'Obtener todas las peliculas registradas',
            responses: {
                200: {
                    description: 'Lista todas las peliculas'
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
    '/api/v1/movies/actor/{id}': {
        get: {
            summary: 'Get info actor / Obtener información del actor',
            description: 'Obtiene los detalles del actor y su carrera',
            operationId: 'getActor',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID del actor',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Detalles e información del actor'
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
    '/api/v1/movies/movie/{id}': {
        get: {
            summary: 'Get info movie / Obtener información de la peilcula',
            description: 'Obtiene los detalles de la pelicula',
            operationId: 'getMovie',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID de la pelicula',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Detalles e información de la pelicula'
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
    '/api/v1/movies/video/{id}': {
        get: {
            summary:
                'Get links and video details / Obtener los enlaces de reproducción',
            description:
                'Obtiene información, trailers y links para reproduccir videos cortos relacionados con la pelicula',
            operationId: 'getVideo',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID del video',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Detalles e información del video'
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
