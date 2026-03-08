/**
 * Configura las opciones de CORS para permitir solicitudes desde orígenes autorizados.
 */
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

module.exports = { corsOptions };