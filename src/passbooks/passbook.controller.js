'use strict';

import { Passbook } from './passbook.model.js';

export const getAllPassbooks = async (req, res) => {
    try {
        const passbooks = await Passbook.find().sort({ date: -1 }).select('-__v');
        res.status(200).json({ success: true, total: passbooks.length, passbooks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener libretas', error: error.message });
    }
};

export const createPassbook = async (req, res) => {
    try {
        const { userId, accountNumber, description } = req.body;
        const passbook = await Passbook.create({ userId, accountNumber, description });
        res.status(201).json({ success: true, passbook });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear libreta', error: error.message });
    }
};

export const deletePassbook = async (req, res) => {
    try {
        const { id } = req.params;
        const passbook = await Passbook.findByIdAndUpdate(id, { status: false }, { new: true });
        if (!passbook) return res.status(404).json({ success: false, message: 'Libreta no encontrada' });
        res.status(200).json({ success: true, message: 'Libreta desactivada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al desactivar libreta', error: error.message });
    }
};
