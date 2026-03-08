const { Schema, model } = require('mongoose');

const ServiceSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre del servicio es obligatorio']
    },
    provider: {
        type: String,
        required: [true, 'El proveedor es obligatorio']
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Service', ServiceSchema);