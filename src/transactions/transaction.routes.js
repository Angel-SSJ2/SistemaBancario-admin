import { Router } from 'express';
import { getAllTransactions } from './transaction.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.get('/', validateJWT, getAllTransactions);

export default router;
