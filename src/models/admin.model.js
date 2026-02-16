const { Schema, model } = require('mongoose');

const adminSchema = Schema({
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

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE'],
        default: 'ADMIN_ROLE'
    },

    status: {
        type: Boolean,
        default: true
    }

});

// No devolver contraseña en respuestas JSON
adminSchema.methods.toJSON = function () {
    const { __v, password, _id, ...admin } = this.toObject();
    admin.uid = _id;
    return admin;
};

module.exports = model('Admin', adminSchema);
