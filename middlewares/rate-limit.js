const rateLimit = require('express-rate-limit');

/**
 * Configura el middleware de limitación de tasa para prevenir ataques de fuerza bruta y denegación de servicio.
 */
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Demasiadas solicitudes desde esta IP, por favor intente nuevamente después de 15 minutos'
    }
});

module.exports = { apiLimiter };