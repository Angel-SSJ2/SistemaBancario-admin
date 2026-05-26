import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreatePassbook = [
    body('userId').notEmpty().withMessage('El ID de usuario es obligatorio'),
    body('accountNumber').notEmpty().withMessage('El número de cuenta es obligatorio'),
    checkValidators,
];

export const validatePassbookId = [
    param('id').notEmpty().withMessage('El ID es obligatorio'),
    checkValidators,
];
