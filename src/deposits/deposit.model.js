import { Schema, model } from 'mongoose';

const DepositSchema = new Schema({
    senderAccount: {
        type: String,
        required: [true, 'La cuenta de origen es obligatoria'],
    },
    accountNumber: {
        type: String,
        required: [true, 'La cuenta destino es obligatoria'],
    },
    amount: {
        type: Number,
        required: [true, 'El monto es obligatorio'],
        min: [1, 'El monto debe ser mayor a 0'],
    },
    method: {
        type: String,
        enum: ['Efectivo', 'Transferencia'],
        default: 'Efectivo',
    },
    description: {
        type: String,
        default: 'Depósito administrativo',
    },
    status: {
        type: String,
        enum: ['Completado', 'Anulado'],
        default: 'Completado',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export const Deposit = model('Deposit', DepositSchema);
