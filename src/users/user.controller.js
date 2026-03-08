const User = require('./user.model');

/**
 * Obtiene la lista paginada de todos los usuarios registrados en el sistema.
 */
const getUsers = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        success: true,
        total,
        users
    });
};

/**
 * Actualiza la información de un usuario específico mediante su identificador.
 */
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { _id, email, role, ...data } = req.body;

    const user = await User.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
        success: true,
        user
    });
};

/**
 * Desactiva un perfil de usuario cambiando su estado lógico en la base de datos.
 */
const deactivateUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });

    res.status(200).json({
        success: true,
        user
    });
};

module.exports = {
    getUsers,
    updateUser,
    deactivateUser
};