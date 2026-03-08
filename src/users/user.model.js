const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    surname: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Client']
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = model('User', UserSchema);