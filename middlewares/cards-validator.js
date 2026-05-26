import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateCard = [
    body('accountNumber').notEmpty().withMessage('El número de cuenta es obligatorio'),
    body('expirationDate').notEmpty().withMessage('La fecha de expiración es obligatoria'),
    checkValidators,
];

export const validateCardId = [
    param('id').notEmpty().withMessage('El ID es obligatorio'),
    checkValidators,
];
