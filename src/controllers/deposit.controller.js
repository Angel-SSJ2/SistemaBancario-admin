const Deposit = require('../models/deposit.model');

const getHistory = async (req, res) => {

    try {
        const history = await Deposit.find()
            .populate('user', 'name surname') 
            .sort({ date: -1 }) // Los más recientes primero
            .limit(10); // Solo los últimos 10

        res.status(200).json({
            msg: 'Historial de depósitos reciente',
            history
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener el historial' });
    }
};

module.exports = { getHistory };
