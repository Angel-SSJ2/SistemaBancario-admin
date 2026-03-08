const helmet = require('helmet');

/**
 * Configura y retorna los middlewares de Helmet para establecer las cabeceras de seguridad HTTP en la aplicación.
 */
const configureHelmet = () => {
    return helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false
    });
};

module.exports = { configureHelmet };