import { Router } from 'express';
import { getAllPassbooks, createPassbook, deletePassbook } from './passbook.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateCreatePassbook, validatePassbookId } from '../../middlewares/passbooks-validator.js';

const router = Router();

router.get('/', validateJWT, getAllPassbooks);
router.post('/', validateJWT, validateCreatePassbook, createPassbook);
router.delete('/:id', validateJWT, validatePassbookId, deletePassbook);

export default router;
