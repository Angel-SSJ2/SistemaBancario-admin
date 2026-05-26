import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    type: {
        type: String,
        required: [true, 'El tipo de producto es obligatorio'],
    },
    rate: {
        type: Number,
        required: [true, 'La tasa es obligatoria'],
        min: 0,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

export const Product = model('Product', ProductSchema);
