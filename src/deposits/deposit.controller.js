const Transaction = require('../transactions/transaction.model');
const Account = require('../accounts/account.model');

/**
 * Realiza un depósito a una cuenta bancaria, actualiza su saldo y registra la transacción.
 */
const createDeposit = async (req, res) => {
    const { receptorAccount, amount, description } = req.body;
    
    const account = await Account.findOne({ accountNumber: receptorAccount });
    if (!account) return res.status(404).json({ success: false, message: 'Cuenta no encontrada' });
    
    account.balance += amount;
    await account.save();

    const transaction = new Transaction({ type: 'Deposit', receptorAccount, amount, description });
    await transaction.save();

    res.status(201).json({ success: true, transaction });
};

module.exports = { createDeposit };