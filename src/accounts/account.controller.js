const Account = require('./account.model');

/**
 * Obtiene todas las cuentas bancarias registradas en el sistema.
 */
const getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(200).json({ success: true, accounts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las cuentas', error });
    }
};

/**
 * Activa o desactiva el estado de una cuenta bancaria específica.
 */
const toggleAccountStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const account = await Account.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json({ success: true, account });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar estado', error });
    }
};

/**
 * Obtiene la cuenta propia del usuario/admin.
 */
const getMyAccount = async (req, res) => {
    try {
        // Asumiendo que req.user.id viene del JWT
        const account = await Account.findOne({ userId: req.user.id });
        if (!account) {
            return res.status(404).json({ success: false, message: 'Cuenta no encontrada' });
        }
        res.status(200).json({ success: true, account });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la cuenta', error });
    }
};

module.exports = { 
    getAccounts, 
    toggleAccountStatus,
    getMyAccount
};