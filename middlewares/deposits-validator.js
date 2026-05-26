import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateDeposit = [
    body('accountNumber').notEmpty().withMessage('El número de cuenta es obligatorio'),
    body('amount')
        .isFloat({ min: 1 })
        .withMessage('El monto debe ser mayor a 0'),
    body('method')
        .optional()
        .isIn(['Efectivo', 'Transferencia'])
        .withMessage('El método debe ser Efectivo o Transferencia'),
    checkValidators,
];
