'use strict';

import { Schema, model } from 'mongoose';

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    currency: {
        type: String,
        required: true,
        default: 'MXN',
    },
    active: {
        type: Boolean,
        default: true,
    },
});

export const Service = model('Service', ServiceSchema);
