const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    },
    
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },

    type: {
    type: String,
    enum: ['Ahorro', 'Monetaria'],
    default: 'Ahorro',
    },

    balance: {
    type: Number,
    default: 0,
    min: 0,
    },

    status: {
    type: String,
    enum: ['Activo', 'Inactivo', 'Bloqueado'],
    default: 'Activo',
    },

    createdAt: {
    type: Date,
    default: Date.now,
    },
})

module.exports = mongoose.model('Account', accountSchema);