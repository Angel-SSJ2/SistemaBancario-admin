import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateUser = [
    body('name').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').trim().notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('role').isIn(['Admin', 'Client']).withMessage('El rol debe ser Admin o Client'),
    checkValidators,
];

export const validateUpdateUser = [
    param('id').notEmpty().withMessage('El ID es obligatorio'),
    body('email').optional().isEmail().withMessage('Formato de email incorrecto'),
    checkValidators,
];

export const validateUserId = [
    param('id').notEmpty().withMessage('El ID debe ser proporcionado'),
    checkValidators,
];
