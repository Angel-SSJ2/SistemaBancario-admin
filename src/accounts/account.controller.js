'use strict';

import { Account } from './account.model.js';

export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find().select('-__v');
        res.status(200).json({ success: true, total: accounts.length, accounts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener cuentas', error: error.message });
    }
};

export const updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const { balance, accountType, status } = req.body;

        const updated = await Account.findByIdAndUpdate(
            id,
            { balance, accountType, status },
            { new: true, runValidators: true }
        );

        if (!updated) return res.status(404).json({ success: false, message: 'Cuenta no encontrada' });

        res.status(200).json({ success: true, message: 'Cuenta actualizada', account: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar cuenta', error: error.message });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account.findByIdAndUpdate(id, { status: false }, { new: true });
        if (!account) return res.status(404).json({ success: false, message: 'Cuenta no encontrada' });

        res.status(200).json({ success: true, message: 'Cuenta desactivada correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al desactivar cuenta', error: error.message });
    }
};
