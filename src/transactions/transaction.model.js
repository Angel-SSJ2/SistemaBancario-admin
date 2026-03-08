const { Schema, model } = require('mongoose');

const TransactionSchema = Schema({
    type: { 
        type: String, 
        required: true, 
        enum: ['Deposit', 'Transfer', 'Payment'] 
    },
    senderAccount: { type: String },
    receptorAccount: { type: String },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = model('Transaction', TransactionSchema);