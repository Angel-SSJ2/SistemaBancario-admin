const Currency = require('./currency.model');

/**
 * Obtiene la lista de divisas activas con sus respectivas tasas de cambio.
 */
const getCurrencies = async (req, res) => {
    const currencies = await Currency.find({ status: true });
    res.status(200).json({ success: true, currencies });
};

/**
 * Registra una nueva divisa y su tasa de cambio base.
 */
const createCurrency = async (req, res) => {
    const { code, name, exchangeRate } = req.body;
    const currency = new Currency({ code, name, exchangeRate });
    await currency.save();
    res.status(201).json({ success: true, currency });
};

/**
 * Actualiza la tasa de cambio de una divisa específica.
 */
const updateExchangeRate = async (req, res) => {
    const { id } = req.params;
    const { exchangeRate } = req.body;
    const currency = await Currency.findByIdAndUpdate(id, { exchangeRate }, { new: true });
    res.status(200).json({ success: true, currency });
};

module.exports = { getCurrencies, createCurrency, updateExchangeRate };