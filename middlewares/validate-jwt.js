import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {
    const token = req.header('x-token') || req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No hay token en la petición',
        });
    }

    try {
        const secretKey = process.env.JWT_SECRET;
        const payload = jwt.verify(token, secretKey);

        const roleClaim =
            payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
            payload.role ||
            payload.Role;

        if (roleClaim !== 'ADMIN_ROLE') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. Se requiere rol de administrador.',
            });
        }

        req.user = {
            id: payload.sub,
            email:
                payload.email ||
                payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
            role: roleClaim,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token no válido',
        });
    }
};
