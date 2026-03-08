const { Schema, model } = require('mongoose');

const AccountSchema = Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    accountType: {
        type: String,
        required: true,
        enum: ['Monetaria', 'Ahorro']
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Account', AccountSchema);