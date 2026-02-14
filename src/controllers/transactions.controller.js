// src/controllers/transactions.controller.js
const Transaction = require('../models/transactions.model');

const getTransactions = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            type,
            status,
            minAmount,
            maxAmount,
            startDate,
            endDate,
            accountId
        } = req.query;

        const filter = {};

        // Filtrado por tipo, estado o cuenta
        if (type) filter.type = type;
        if (status) filter.status = status;
        if (accountId) filter.accountId = accountId;

        // Filtrado por monto
        if (minAmount || maxAmount) {
            filter.amount = {};
            if (minAmount) filter.amount.$gte = Number(minAmount);
            if (maxAmount) filter.amount.$lte = Number(maxAmount);
        }

        // Filtrado por fecha
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        // CLIENT_ROLE → solo sus transacciones
        if (req.user.role === 'CLIENT_ROLE') {
            filter.performedBy = req.user.uid;
        }

        const transactions = await Transaction.find(filter)
            .populate('accountId', 'accountNumber')
            .populate('performedBy', 'name surname email')
            .limit(Number(limit))
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Transaction.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: transactions,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: Number(limit),
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Error al obtener transacciones' });
    }
};

module.exports = { getTransactions };
