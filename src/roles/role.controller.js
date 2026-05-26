'use strict';

import { Role } from './role.model.js';

export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json({ success: true, roles });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener roles', error: error.message });
    }
};
