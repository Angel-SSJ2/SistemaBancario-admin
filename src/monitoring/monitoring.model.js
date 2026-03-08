const { Schema, model } = require('mongoose');

const MonitoringSchema = Schema({
    action: { type: String, required: true },
    userId: { type: String, required: true },
    details: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = model('Monitoring', MonitoringSchema);