import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    surname: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Client'],
    },
    status: {
        type: Boolean,
        default: true,
    },
});

export const User = model('User', UserSchema);
