import { Router } from 'express';
import { getAllDeposits, createDeposit } from './deposit.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateCreateDeposit } from '../../middlewares/deposits-validator.js';

const router = Router();

router.get('/', validateJWT, getAllDeposits);
router.post('/', validateJWT, validateCreateDeposit, createDeposit);

export default router;
