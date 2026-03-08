const jwt = require('jsonwebtoken');

/**
 * Valida el JSON Web Token de la petición HTTP verificando su firma y vigencia mediante la clave secreta compartida.
 * Extrae los claims del token para confirmar que el usuario autenticado posee el rol de Administrador.
 */
const validateJWT = (req, res, next) => {
    const token = req.header('x-token') || req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No hay token en la petición'
        });
    }

    try {
        const secretKey = process.env.JWT_SECRET || 'SuperSecretKeyParaElSistemaBancario2024+';
        const payload = jwt.verify(token, secretKey);

        const roleClaim = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role || payload.Role;

        if (roleClaim !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. Requiere privilegios de administrador'
            });
        }

        req.user = {
            id: payload.sub,
            email: payload.email || payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
            role: roleClaim
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token no válido'
        });
    }
};

module.exports = { validateJWT };