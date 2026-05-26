import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
});

export const Role = model('Role', RoleSchema);
