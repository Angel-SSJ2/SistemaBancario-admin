// src/middlewares/is-admin.js
const validateRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ msg: 'Token no válido' });
        }

        if (req.user.role !== role) {
            return res.status(403).json({
                msg: `Acción permitida solo para ${role}`
            });
        }
        next();
    };
};

module.exports = validateRole;
