const Transaction = require('../models/transaction.model');

const getHistory = async (req, res) => {

    try {
        const history = await Transaction.find()
            .populate('sender', 'name surname')
            .populate('receiver', 'name surname')
            .sort({ date: -1 })
            .limit(10);

        res.status(200).json({
            msg: 'Historial reciente del sistema',
            history
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener el historial'
        });
    }
};

module.exports = { getHistory };
