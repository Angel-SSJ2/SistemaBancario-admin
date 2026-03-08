const Service = require('./service.model');

/**
 * Lista todos los servicios disponibles para pago.
 */
const getServices = async (req, res) => {
    const services = await Service.find({ status: true });
    res.status(200).json({ success: true, services });
};

/**
 * Agrega un nuevo servicio al catálogo de pagos.
 */
const createService = async (req, res) => {
    const { name, provider } = req.body;
    const service = new Service({ name, provider });
    await service.save();
    res.status(201).json({ success: true, service });
};

module.exports = { getServices, createService };