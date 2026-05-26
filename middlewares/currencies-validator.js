import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateCurrency = [
    body('code').trim().notEmpty().withMessage('El código de moneda es obligatorio'),
    body('name').trim().notEmpty().withMessage('El nombre de la moneda es obligatorio'),
    body('exchangeRate').isFloat({ min: 0 }).withMessage('La tasa de cambio debe ser un número positivo'),
    checkValidators,
];

export const validateUpdateCurrency = [
    param('id').notEmpty().withMessage('El ID es obligatorio'),
    body('exchangeRate').optional().isFloat({ min: 0 }).withMessage('La tasa de cambio debe ser un número positivo'),
    checkValidators,
];
