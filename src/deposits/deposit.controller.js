'use strict';

import { Deposit } from './deposit.model.js';
import { Account } from '../accounts/account.model.js';
import { Transaction } from '../transactions/transaction.model.js';

export const getAllDeposits = async (req, res) => {
    try {
        const deposits = await Deposit.find().sort({ date: -1 }).select('-__v');
        res.status(200).json({ success: true, total: deposits.length, deposits });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener depósitos', error: error.message });
    }
};

export const createDeposit = async (req, res) => {
    let senderAccountDoc;
    let targetAccountDoc;

    try {
        const { senderAccount, accountNumber, amount, method, description } = req.body;

        senderAccountDoc = await Account.findOne({ accountNumber: senderAccount, status: true });
        if (!senderAccountDoc) {
            return res.status(404).json({ success: false, message: 'Cuenta origen no encontrada o inactiva' });
        }

        targetAccountDoc = await Account.findOne({ accountNumber, status: true });
        if (!targetAccountDoc) {
            return res.status(404).json({ success: false, message: 'Cuenta destino no encontrada o inactiva' });
        }

        const depositAmount = Number(amount);
        if (senderAccountDoc.balance < depositAmount) {
            return res.status(400).json({ success: false, message: 'Fondos insuficientes en la cuenta origen' });
        }

        senderAccountDoc.balance -= depositAmount;
        await senderAccountDoc.save();

        targetAccountDoc.balance += depositAmount;
        await targetAccountDoc.save();

        const deposit = await Deposit.create({ senderAccount, accountNumber, amount: depositAmount, method, description });

        // Registrar en la colección de transacciones para que aparezca en el historial global
        await Transaction.create({
            type: 'Deposit',
            senderAccount: senderAccount,
            receptorAccount: accountNumber,
            amount: depositAmount,
            description: description || 'Depósito administrativo',
            date: deposit.date
        });

        res.status(201).json({ success: true, deposit });
    } catch (error) {
        if (senderAccountDoc) {
            senderAccountDoc.balance += Number(req.body.amount || 0);
            await senderAccountDoc.save().catch(() => {});
        }
        res.status(500).json({ success: false, message: 'Error al crear depósito', error: error.message });
    }
};
