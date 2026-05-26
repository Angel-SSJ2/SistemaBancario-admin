import { Router } from 'express';
import { getAllTransfers } from './transfer.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.get('/', validateJWT, getAllTransfers);

export default router;
