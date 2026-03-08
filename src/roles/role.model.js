const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    }
});

module.exports = model('Role', RoleSchema);