import { Schema, model } from 'mongoose';

const TransactionSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['Deposit', 'Transfer', 'Payment'],
    },
    senderAccount: { type: String },
    receptorAccount: { type: String },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

export const Transaction = model('Transaction', TransactionSchema);
