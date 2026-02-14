// src/controllers/admin.controller.js
const User = require('../models/user.model');
const Account = require('../models/account.model');
const Audit = require('../models/audit.model');

// Ver todos los usuarios → solo ADMIN_ROLE
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Error al obtener usuarios' });
    }
};

// Eliminar usuario → solo ADMIN_ROLE
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });
        if (!user) return res.status(404).json({ success: false, msg: 'Usuario no encontrado' });

        // Registrar auditoría
        await Audit.create({
            adminId: req.user.uid,
            action: 'ELIMINAR_USUARIO',
            targetId: id,
            description: `Usuario eliminado por ${req.user.name}`,
            ipAddress: req.ip,
        });

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Error al eliminar usuario' });
    }
};

module.exports = { getAllUsers, deleteUser };
