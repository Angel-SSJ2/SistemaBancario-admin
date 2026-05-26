import { Schema, model } from 'mongoose';

const CurrencySchema = new Schema({
    code: {
        type: String,
        required: [true, 'El código de moneda es obligatorio'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'El nombre de la moneda es obligatorio'],
    },
    exchangeRate: {
        type: Number,
        required: [true, 'La tasa de cambio es obligatoria'],
    },
    status: {
        type: Boolean,
        default: true,
    },
});

export const Currency = model('Currency', CurrencySchema);
