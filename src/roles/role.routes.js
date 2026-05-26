import { Router } from 'express';
import { getAllRoles } from './role.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.get('/', validateJWT, getAllRoles);

export default router;
