import { Schema, model } from 'mongoose';

const DepositSchema = new Schema({
    accountNumber: {
        type: String,
        required: [true, 'El número de cuenta es obligatorio'],
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
