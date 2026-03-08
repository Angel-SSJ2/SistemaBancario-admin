const Transaction = require('../transactions/transaction.model');
const Account = require('../accounts/account.model');
const Service = require('../services/service.model');

/**
 * Procesa el pago de un servicio descontando el monto de la cuenta origen.
 */
const createPayment = async (req, res) => {
    const { senderAccount, serviceId, amount, description } = req.body;
    
    const account = await Account.findOne({ accountNumber: senderAccount });
    const service = await Service.findById(serviceId);

    if (!account || !service) return res.status(404).json({ success: false, message: 'Cuenta o servicio no encontrado' });
    if (account.balance < amount) return res.status(400).json({ success: false, message: 'Saldo insuficiente' });

    account.balance -= amount;
    await account.save();

    const transaction = new Transaction({ type: 'Payment', senderAccount, service: serviceId, amount, description });
    await transaction.save();

    res.status(201).json({ success: true, transaction });
};

module.exports = { createPayment };