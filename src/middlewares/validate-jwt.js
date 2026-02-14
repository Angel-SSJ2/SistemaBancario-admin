const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Usuario no existe'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Usuario inactivo'
            });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

module.exports = validateJWT;
