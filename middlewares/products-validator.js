import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateProduct = [
    body('name').trim().notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('description').trim().notEmpty().withMessage('La descripción es obligatoria'),
    body('type').trim().notEmpty().withMessage('El tipo de producto es obligatorio'),
    body('rate').isFloat({ min: 0 }).withMessage('La tasa debe ser un número positivo'),
    checkValidators,
];

export const validateUpdateProduct = [
    param('id').notEmpty().withMessage('El ID es obligatorio'),
    body('rate').optional().isFloat({ min: 0 }).withMessage('La tasa debe ser un número positivo'),
    checkValidators,
];

export const validateProductId = [
    param('id').notEmpty().withMessage('El ID es obligatorio'),
    checkValidators,
];
