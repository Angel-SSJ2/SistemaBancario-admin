'use strict';

import { Shopping } from './shopping.model.js';
import { Account } from '../accounts/account.model.js';
import { Transaction } from '../transactions/transaction.model.js';

export const getAllShoppings = async (req, res) => {
    try {
        const shoppings = await Shopping.find().sort({ date: -1 }).select('-__v');
        res.status(200).json({ success: true, total: shoppings.length, shoppings });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener compras', error: error.message });
    }
};

export const createShopping = async (req, res) => {
    let account;
    let receptorAccountDoc;

    try {
        const { userId, accountNumber, receptorAccount, amount, description } = req.body;

        account = await Account.findOne({ accountNumber, status: true });
        if (!account) {
            return res.status(404).json({ success: false, message: 'Cuenta de origen no encontrada o inactiva' });
        }

        receptorAccountDoc = await Account.findOne({ accountNumber: receptorAccount, status: true });
        if (!receptorAccountDoc) {
            return res.status(404).json({ success: false, message: 'Cuenta destino no encontrada o inactiva' });
        }

        const purchaseAmount = Number(amount);
        if (account.balance < purchaseAmount) {
            return res.status(400).json({ success: false, message: 'Fondos insuficientes' });
        }

        account.balance -= purchaseAmount;
        await account.save();

        receptorAccountDoc.balance += purchaseAmount;
        await receptorAccountDoc.save();

        const shopping = await Shopping.create({ userId, accountNumber, receptorAccount, amount: purchaseAmount, description });

        // Registrar en la colección de transacciones para que aparezca en el historial global
        await Transaction.create({
            type: 'Payment',
            senderAccount: accountNumber,
            receptorAccount: receptorAccount,
            amount: purchaseAmount,
            description: description || 'Pago de compras',
            date: shopping.date
        });

        res.status(201).json({
            success: true,
            shopping,
            account: {
                accountNumber: account.accountNumber,
                balance: account.balance,
            },
        });
    } catch (error) {
        if (account) {
            account.balance += Number(req.body.amount || 0);
            await account.save().catch(() => {});
        }
        if (receptorAccountDoc) {
            receptorAccountDoc.balance -= Number(req.body.amount || 0);
            await receptorAccountDoc.save().catch(() => {});
        }
        res.status(500).json({ success: false, message: 'Error al crear compra', error: error.message });
    }
};

export const deleteShopping = async (req, res) => {
    try {
        const { id } = req.params;
        const shopping = await Shopping.findById(id);
        if (!shopping) return res.status(404).json({ success: false, message: 'Compra no encontrada' });
        if (shopping.status === 'Anulado') {
            return res.status(400).json({ success: false, message: 'La compra ya está anulada' });
        }

        const account = await Account.findOne({ accountNumber: shopping.accountNumber, status: true });
        if (account) {
            account.balance += shopping.amount;
            await account.save();
        }

        const receptorAccountDoc = await Account.findOne({ accountNumber: shopping.receptorAccount, status: true });
        if (receptorAccountDoc) {
            receptorAccountDoc.balance -= shopping.amount;
            await receptorAccountDoc.save();
        }

        shopping.status = 'Anulado';
        await shopping.save();

        res.status(200).json({ success: true, message: 'Compra anulada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al anular compra', error: error.message });
    }
};
