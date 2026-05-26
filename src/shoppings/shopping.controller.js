'use strict';

import { Shopping } from './shopping.model.js';
import { Account } from '../accounts/account.model.js';

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

    try {
        const { userId, accountNumber, amount, description } = req.body;

        account = await Account.findOne({ accountNumber, status: true });
        if (!account) {
            return res.status(404).json({ success: false, message: 'Cuenta no encontrada o inactiva' });
        }

        const purchaseAmount = Number(amount);
        if (account.balance < purchaseAmount) {
            return res.status(400).json({ success: false, message: 'Fondos insuficientes' });
        }

        account.balance -= purchaseAmount;
        await account.save();

        const shopping = await Shopping.create({ userId, accountNumber, amount: purchaseAmount, description });

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

        shopping.status = 'Anulado';
        await shopping.save();

        res.status(200).json({ success: true, message: 'Compra anulada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al anular compra', error: error.message });
    }
};
