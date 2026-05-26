import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateShopping = [
    body('userId').notEmpty().withMessage('El ID de usuario es obligatorio'),
    body('accountNumber').notEmpty().withMessage('El número de cuenta es obligatorio'),
    body('amount').isFloat({ min: 0.01 }).withMessage('El monto debe ser mayor a 0'),
    body('description').trim().notEmpty().withMessage('La descripción es obligatoria'),
    checkValidators,
];

export const validateShoppingId = [
    param('id').notEmpty().withMessage('El ID es obligatorio'),
    checkValidators,
];
