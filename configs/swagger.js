'use strict';

export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'SistemaBancario Admin API',
        version: '1.0.0',
        description: 'Documentación Swagger de la API administrativa de SistemaBancario.',
    },
    servers: [
        {
            url: 'http://localhost:3001/api/v1',
            description: 'Servidor local',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            Service: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' },
                    currency: { type: 'string' },
                    active: { type: 'boolean' },
                },
            },
            User: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    surname: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string' },
                    status: { type: 'boolean' },
                },
            },
            Account: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    accountNumber: { type: 'string' },
                    userId: { type: 'string' },
                    balance: { type: 'number' },
                    accountType: { type: 'string' },
                    status: { type: 'boolean' },
                },
            },
            GenericEntity: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                },
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    message: { type: 'string' },
                    error: { type: 'string' },
                },
            },
        },
    },
    security: [{ bearerAuth: [] }],
    paths: {
        '/roles': {
            get: {
                summary: 'Obtener todos los roles',
                responses: {
                    200: { description: 'Lista de roles' },
                    500: { description: 'Error interno', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
                },
            },
        },
        '/users': {
            get: {
                summary: 'Obtener todos los usuarios',
                responses: {
                    200: { description: 'Lista de usuarios' },
                    500: { description: 'Error interno' },
                },
            },
            post: {
                summary: 'Crear un nuevo usuario',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    surname: { type: 'string' },
                                    email: { type: 'string' },
                                    role: { type: 'string' },
                                    accountType: { type: 'string' },
                                },
                                required: ['name', 'surname', 'email'],
                            },
                        },
                    },
                },
                responses: {
                    201: { description: 'Usuario creado' },
                    409: { description: 'Correo ya registrado' },
                    500: { description: 'Error interno' },
                },
            },
        },
        '/users/{id}': {
            get: {
                summary: 'Obtener usuario por ID',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { 200: { description: 'Usuario encontrado' }, 404: { description: 'Usuario no encontrado' }, 500: { description: 'Error interno' } },
            },
            put: {
                summary: 'Actualizar usuario',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    surname: { type: 'string' },
                                    email: { type: 'string' },
                                    role: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                responses: { 200: { description: 'Usuario actualizado' }, 404: { description: 'Usuario no encontrado' }, 500: { description: 'Error interno' } },
            },
            delete: {
                summary: 'Desactivar usuario',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { 200: { description: 'Usuario desactivado' }, 404: { description: 'Usuario no encontrado' }, 500: { description: 'Error interno' } },
            },
        },
        '/users/account': {
            post: {
                summary: 'Agregar cuenta extra a usuario',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userId: { type: 'string' },
                                    accountType: { type: 'string' },
                                },
                                required: ['userId'],
                            },
                        },
                    },
                },
                responses: { 201: { description: 'Cuenta adicional creada' }, 404: { description: 'Usuario no encontrado' }, 500: { description: 'Error interno' } },
            },
        },
        '/accounts': {
            get: { summary: 'Obtener todas las cuentas', responses: { 200: { description: 'Lista de cuentas' }, 500: { description: 'Error interno' } } },
            post: {
                summary: 'Crear cuenta adicional',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { type: 'object', properties: { userId: { type: 'string' }, accountType: { type: 'string' } }, required: ['userId'] } } },
                },
                responses: { 201: { description: 'Cuenta creada' }, 500: { description: 'Error interno' } },
            },
        },
        '/accounts/{id}': {
            put: {
                summary: 'Actualizar cuenta',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { accountType: { type: 'string' }, status: { type: 'boolean' } } } } } },
                responses: { 200: { description: 'Cuenta actualizada' }, 404: { description: 'Cuenta no encontrada' }, 500: { description: 'Error interno' } },
            },
            delete: {
                summary: 'Eliminar cuenta',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { 200: { description: 'Cuenta eliminada' }, 500: { description: 'Error interno' } },
            },
        },
        '/deposits': {
            get: { summary: 'Obtener todos los depósitos', responses: { 200: { description: 'Lista de depósitos' }, 500: { description: 'Error interno' } } },
            post: { summary: 'Crear depósito', requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 201: { description: 'Depósito creado' }, 500: { description: 'Error interno' } } },
        },
        '/currencies': {
            get: { summary: 'Obtener todas las monedas', responses: { 200: { description: 'Lista de monedas' }, 500: { description: 'Error interno' } } },
            post: { summary: 'Crear moneda', requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 201: { description: 'Moneda creada' }, 500: { description: 'Error interno' } } },
        },
        '/currencies/{id}': {
            put: { summary: 'Actualizar moneda', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 200: { description: 'Moneda actualizada' }, 404: { description: 'Moneda no encontrada' }, 500: { description: 'Error interno' } } },
            delete: { summary: 'Eliminar moneda', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Moneda eliminada' }, 500: { description: 'Error interno' } } },
        },
        '/cards': {
            get: { summary: 'Obtener todas las tarjetas', responses: { 200: { description: 'Lista de tarjetas' }, 500: { description: 'Error interno' } } },
            post: { summary: 'Crear tarjeta', requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 201: { description: 'Tarjeta creada' }, 500: { description: 'Error interno' } } },
        },
        '/cards/{id}': {
            delete: { summary: 'Eliminar tarjeta', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Tarjeta eliminada' }, 500: { description: 'Error interno' } } },
        },
        '/passbooks': {
            get: { summary: 'Obtener todos los libretas', responses: { 200: { description: 'Lista de libretas' }, 500: { description: 'Error interno' } } },
            post: { summary: 'Crear libreta', requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 201: { description: 'Libreta creada' }, 500: { description: 'Error interno' } } },
        },
        '/passbooks/{id}': {
            delete: { summary: 'Eliminar libreta', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Libreta eliminada' }, 500: { description: 'Error interno' } } },
        },
        '/products': {
            get: { summary: 'Obtener todos los productos', responses: { 200: { description: 'Lista de productos' }, 500: { description: 'Error interno' } } },
            post: { summary: 'Crear producto', requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 201: { description: 'Producto creado' }, 500: { description: 'Error interno' } } },
        },
        '/products/{id}': {
            put: { summary: 'Actualizar producto', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 200: { description: 'Producto actualizado' }, 404: { description: 'Producto no encontrado' }, 500: { description: 'Error interno' } } },
            delete: { summary: 'Eliminar producto', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Producto eliminado' }, 500: { description: 'Error interno' } } },
        },
        '/shoppings': {
            get: { summary: 'Obtener todas las compras', responses: { 200: { description: 'Lista de compras' }, 500: { description: 'Error interno' } } },
            post: { summary: 'Crear compra', requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 201: { description: 'Compra creada' }, 500: { description: 'Error interno' } } },
        },
        '/shoppings/{id}': {
            delete: { summary: 'Eliminar compra', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Compra eliminada' }, 500: { description: 'Error interno' } } },
        },
        '/transactions': {
            get: { summary: 'Obtener todas las transacciones', responses: { 200: { description: 'Lista de transacciones' }, 500: { description: 'Error interno' } } },
        },
        '/transfers': {
            get: { summary: 'Obtener todas las transferencias', responses: { 200: { description: 'Lista de transferencias' }, 500: { description: 'Error interno' } } },
        },
        '/services': {
            get: { summary: 'Obtener todos los servicios', responses: { 200: { description: 'Lista de servicios' }, 500: { description: 'Error interno' } } },
            post: { summary: 'Crear servicio', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Service' } } } }, responses: { 201: { description: 'Servicio creado' }, 409: { description: 'Servicio ya existe' }, 500: { description: 'Error interno' } } },
        },
        '/services/{id}': {
            get: { summary: 'Obtener servicio por ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Servicio encontrado' }, 404: { description: 'Servicio no encontrado' }, 500: { description: 'Error interno' } } },
            put: { summary: 'Actualizar servicio', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Service' } } } }, responses: { 200: { description: 'Servicio actualizado' }, 404: { description: 'Servicio no encontrado' }, 500: { description: 'Error interno' } } },
            delete: { summary: 'Desactivar servicio', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Servicio desactivado' }, 404: { description: 'Servicio no encontrado' }, 500: { description: 'Error interno' } } },
        },
    },
};
