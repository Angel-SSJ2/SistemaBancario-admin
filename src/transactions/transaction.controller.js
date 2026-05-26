'use strict';

import { Transaction } from './transaction.model.js';

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 }).select('-__v');
        res.status(200).json({ success: true, total: transactions.length, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener transacciones', error: error.message });
    }
};
