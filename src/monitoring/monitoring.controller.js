const Monitoring = require('./monitoring.model');

/**
 * Registra internamente una acción en la bitácora de auditoría.
 */
const createLog = async (action, userId, details) => {
    const log = new Monitoring({ action, userId, details });
    await log.save();
};

/**
 * Obtiene todos los registros de auditoría del sistema ordenados por fecha.
 */
const getLogs = async (req, res) => {
    const logs = await Monitoring.find().sort({ date: -1 });
    res.status(200).json({ success: true, logs });
};

module.exports = { createLog, getLogs };