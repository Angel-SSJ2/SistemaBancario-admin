'use strict';

import { Transfer } from './transfer.model.js';

export const getAllTransfers = async (req, res) => {
    try {
        const transfers = await Transfer.find({ type: 'Transfer' }).sort({ date: -1 }).select('-__v');
        res.status(200).json({ success: true, total: transfers.length, transfers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener transferencias', error: error.message });
    }
};
