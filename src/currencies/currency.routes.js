import { Router } from 'express';
import { getAllCurrencies, createCurrency, updateCurrency, deleteCurrency } from './currency.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateCreateCurrency, validateUpdateCurrency } from '../../middlewares/currencies-validator.js';

const router = Router();

router.get('/', validateJWT, getAllCurrencies);
router.post('/', validateJWT, validateCreateCurrency, createCurrency);
router.put('/:id', validateJWT, validateUpdateCurrency, updateCurrency);
router.delete('/:id', validateJWT, deleteCurrency);

export default router;
