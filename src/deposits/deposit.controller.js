'use strict';

import { Deposit } from './deposit.model.js';
import { Account } from '../accounts/account.model.js';

export const getAllDeposits = async (req, res) => {
    try {
        const deposits = await Deposit.find().sort({ date: -1 }).select('-__v');
        res.status(200).json({ success: true, total: deposits.length, deposits });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener depósitos', error: error.message });
    }
};

export const createDeposit = async (req, res) => {
    try {
        const { accountNumber, amount, method, description } = req.body;

        const account = await Account.findOne({ accountNumber, status: true });
        if (!account) {
            return res.status(404).json({ success: false, message: 'Cuenta no encontrada o inactiva' });
        }

        account.balance += Number(amount);
        await account.save();

        const deposit = await Deposit.create({ accountNumber, amount, method, description });

        res.status(201).json({ success: true, deposit });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear depósito', error: error.message });
    }
};
