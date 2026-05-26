'use strict';

import { Currency } from './currency.model.js';

export const getAllCurrencies = async (req, res) => {
    try {
        const currencies = await Currency.find().select('-__v');
        res.status(200).json({ success: true, currencies });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener monedas', error: error.message });
    }
};

export const createCurrency = async (req, res) => {
    try {
        const { code, name, exchangeRate } = req.body;
        const currency = await Currency.create({ code, name, exchangeRate });
        res.status(201).json({ success: true, currency });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: 'El código de moneda ya existe' });
        }
        res.status(500).json({ success: false, message: 'Error al crear moneda', error: error.message });
    }
};

export const updateCurrency = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Currency.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ success: false, message: 'Moneda no encontrada' });
        res.status(200).json({ success: true, message: 'Moneda actualizada', currency: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar moneda', error: error.message });
    }
};

export const deleteCurrency = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Currency.findByIdAndUpdate(id, { status: false }, { new: true });
        if (!deleted) return res.status(404).json({ success: false, message: 'Moneda no encontrada' });
        res.status(200).json({ success: true, message: 'Moneda desactivada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al desactivar moneda', error: error.message });
    }
};
