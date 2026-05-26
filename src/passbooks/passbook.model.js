import { Schema, model } from 'mongoose';

const PassbookSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'El ID de usuario es obligatorio'],
    },
    accountNumber: {
        type: String,
        required: [true, 'El número de cuenta es obligatorio'],
    },
    description: {
        type: String,
        default: 'Libreta de ahorros',
    },
    status: {
        type: Boolean,
        default: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export const Passbook = model('Passbook', PassbookSchema);
