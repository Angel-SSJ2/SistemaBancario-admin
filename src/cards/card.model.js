import { Schema, model } from 'mongoose';

const CardSchema = new Schema({
    cardNumber: {
        type: String,
        required: [true, 'El número de tarjeta es obligatorio'],
        unique: true,
    },
    cvv: {
        type: String,
        required: [true, 'El CVV es obligatorio'],
    },
    expirationDate: {
        type: String,
        required: [true, 'La fecha de expiración es obligatoria'],
    },
    status: {
        type: String,
        enum: ['Activa', 'Inactiva', 'Bloqueada'],
        default: 'Activa',
    },
    accountNumber: {
        type: String,
        required: [true, 'El número de cuenta es obligatorio'],
    },
});

export const Card = model('Card', CardSchema);
