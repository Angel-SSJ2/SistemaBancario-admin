import { Router } from 'express';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from './product.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateCreateProduct, validateUpdateProduct, validateProductId } from '../../middlewares/products-validator.js';

const router = Router();

router.get('/', validateJWT, getAllProducts);
router.post('/', validateJWT, validateCreateProduct, createProduct);
router.put('/:id', validateJWT, validateUpdateProduct, updateProduct);
router.delete('/:id', validateJWT, validateProductId, deleteProduct);

export default router;
