import { Router } from 'express';
import { getAllShoppings, createShopping, deleteShopping } from './shopping.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateCreateShopping, validateShoppingId } from '../../middlewares/shoppings-validator.js';

const router = Router();

router.get('/', validateJWT, getAllShoppings);
router.post('/', validateJWT, validateCreateShopping, createShopping);
router.delete('/:id', validateJWT, validateShoppingId, deleteShopping);

export default router;
