import { Schema, model } from 'mongoose';

const ShoppingSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'El ID de usuario es obligatorio'],
    },
    accountNumber: {
        type: String,
        required: [true, 'El número de cuenta es obligatorio'],
    },
    receptorAccount: {
        type: String,
        required: [true, 'La cuenta destino es obligatoria'],
    },
    amount: {
        type: Number,
        required: [true, 'El monto es obligatorio'],
        min: [0.01, 'El monto debe ser mayor a 0'],
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    status: {
        type: String,
        enum: ['Completado', 'Anulado', 'Pendiente'],
        default: 'Completado',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export const Shopping = model('Shopping', ShoppingSchema);
