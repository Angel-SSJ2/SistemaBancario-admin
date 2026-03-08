'use strict'

import User from '../users/user.model.js'

// Ver saldo y número de cuenta del usuario 
export const getMyAccount = async (req, res) => {
    try {
        // Obtenemos el ID del usuario desde el token JWT
        const userId = req.user.id 

        const user = await User.findById(userId)
            .select('name surname accountNumber balance')

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la cuenta',
            err
        })
    }
}

/**
 * Obtiene todas las cuentas bancarias registradas en el sistema.
 */
const getAccounts = async (req, res) => {
    const accounts = await Account.find();
    res.status(200).json({ success: true, accounts });
};

/**
 * Activa o desactiva el estado de una cuenta bancaria específica.
 */
const toggleAccountStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const account = await Account.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ success: true, account });
};

module.exports = { getMyAccount, getAccounts, toggleAccountStatus};