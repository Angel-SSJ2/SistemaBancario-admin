'use strict';

import { Card } from './card.model.js';
import { Account } from '../accounts/account.model.js';

const generateCardNumber = () =>
    Array.from({ length: 4 }, () => Math.floor(1000 + Math.random() * 9000)).join('');

const generateCvv = () => Math.floor(100 + Math.random() * 900).toString();

const generateExpirationDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 4);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    return `${mm}/${yy}`;
};

export const getAllCards = async (req, res) => {
    try {
        const cards = await Card.find().select('-__v');
        res.status(200).json({ success: true, total: cards.length, cards });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener tarjetas', error: error.message });
    }
};

export const createCard = async (req, res) => {
    try {
        const { accountNumber, expirationDate } = req.body;

        const account = await Account.findOne({ accountNumber, status: true });
        if (!account) {
            return res.status(404).json({ success: false, message: 'Cuenta no encontrada o inactiva' });
        }

        const card = await Card.create({
            cardNumber: generateCardNumber(),
            cvv: generateCvv(),
            expirationDate: expirationDate || generateExpirationDate(),
            accountNumber,
        });

        res.status(201).json({ success: true, card });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al emitir tarjeta', error: error.message });
    }
};

export const deleteCard = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await Card.findByIdAndUpdate(id, { status: 'Inactiva' }, { new: true });
        if (!card) return res.status(404).json({ success: false, message: 'Tarjeta no encontrada' });
        res.status(200).json({ success: true, message: 'Tarjeta desactivada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al desactivar tarjeta', error: error.message });
    }
};
