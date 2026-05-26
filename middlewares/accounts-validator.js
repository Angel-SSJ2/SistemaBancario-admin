import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateAccount = [
    body('userId').notEmpty().withMessage('El ID de usuario es obligatorio'),
    body('accountType')
        .isIn(['Monetaria', 'Ahorro'])
        .withMessage('El tipo de cuenta debe ser Monetaria o Ahorro'),
    checkValidators,
];

export const validateUpdateAccount = [
    param('id').notEmpty().withMessage('El ID es obligatorio'),
    body('balance').optional().isNumeric().withMessage('El balance debe ser un número'),
    body('accountType')
        .optional()
        .isIn(['Monetaria', 'Ahorro'])
        .withMessage('Tipo de cuenta no válido'),
    checkValidators,
];
