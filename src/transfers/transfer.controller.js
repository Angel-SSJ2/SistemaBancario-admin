const Transaction = require('../transactions/transaction.model');
const Account = require('../accounts/account.model');

/**
 * Ejecuta una transferencia de fondos entre dos cuentas bancarias validando el saldo disponible.
 */
const createTransfer = async (req, res) => {
    const { senderAccount, receptorAccount, amount, description } = req.body;
    
    const sender = await Account.findOne({ accountNumber: senderAccount });
    const receptor = await Account.findOne({ accountNumber: receptorAccount });

    if (!sender || !receptor) return res.status(404).json({ success: false, message: 'Cuentas no encontradas' });
    if (sender.balance < amount) return res.status(400).json({ success: false, message: 'Saldo insuficiente' });

    sender.balance -= amount;
    receptor.balance += amount;
    
    await Promise.all([sender.save(), receptor.save()]);

    const transaction = new Transaction({ type: 'Transfer', senderAccount, receptorAccount, amount, description });
    await transaction.save();

    res.status(201).json({ success: true, transaction });
};

module.exports = { createTransfer };