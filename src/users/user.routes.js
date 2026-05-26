import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addExtraAccount,
} from './user.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateCreateUser, validateUpdateUser, validateUserId } from '../../middlewares/users-validator.js';

const router = Router();

router.get('/', validateJWT, getAllUsers);
router.get('/:id', validateJWT, validateUserId, getUserById);
router.post('/', validateJWT, validateCreateUser, createUser);
router.post('/account', validateJWT, addExtraAccount);
router.put('/:id', validateJWT, validateUpdateUser, updateUser);
router.delete('/:id', validateJWT, validateUserId, deleteUser);

export default router;
