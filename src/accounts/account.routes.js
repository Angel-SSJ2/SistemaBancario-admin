import { Router } from 'express';
import { getAllAccounts, updateAccount, deleteAccount } from './account.controller.js';
import { addExtraAccount } from '../users/user.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateUpdateAccount, validateCreateAccount } from '../../middlewares/accounts-validator.js';

const router = Router();

router.get('/', validateJWT, getAllAccounts);
router.post('/', validateJWT, validateCreateAccount, addExtraAccount);
router.put('/:id', validateJWT, validateUpdateAccount, updateAccount);
router.delete('/:id', validateJWT, deleteAccount);

export default router;
