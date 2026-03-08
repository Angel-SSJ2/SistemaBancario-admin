const Role = require('./role.model');

/**
 * Obtiene la lista completa de roles disponibles en el sistema.
 */
const getRoles = async (req, res) => {
    const roles = await Role.find();
    res.status(200).json({ success: true, roles });
};

/**
 * Crea un nuevo rol en la base de datos.
 */
const createRole = async (req, res) => {
    const { role, description } = req.body;
    const newRole = new Role({ role, description });
    await newRole.save();
    res.status(201).json({ success: true, role: newRole });
};

module.exports = { getRoles, createRole };