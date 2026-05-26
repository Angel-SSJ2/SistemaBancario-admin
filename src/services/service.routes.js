import { Router } from 'express';
import {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
} from './service.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.get('/', validateJWT, getAllServices);
router.get('/:id', validateJWT, getServiceById);
router.post('/', validateJWT, createService);
router.put('/:id', validateJWT, updateService);
router.delete('/:id', validateJWT, deleteService);

export default router;
