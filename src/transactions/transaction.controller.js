const Transaction = require('./transaction.model');

/**
 * Obtiene el historial completo de transacciones registradas en el sistema.
 */
const getTransactions = async (req, res) => {
    const transactions = await Transaction.find().populate('service', 'name').sort({ date: -1 });
    res.status(200).json({ success: true, transactions });
};

module.exports = { getTransactions };