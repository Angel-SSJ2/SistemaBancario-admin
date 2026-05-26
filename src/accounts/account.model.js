import { Schema, model } from 'mongoose';

const AccountSchema = new Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    accountType: {
        type: String,
        required: true,
        enum: ['Monetaria', 'Ahorro'],
    },
    status: {
        type: Boolean,
        default: true,
    },
});

export const Account = model('Account', AccountSchema);
