import { Router } from 'express';
import { getAllCards, createCard, deleteCard } from './card.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { validateCreateCard, validateCardId } from '../../middlewares/cards-validator.js';

const router = Router();

router.get('/', validateJWT, getAllCards);
router.post('/', validateJWT, validateCreateCard, createCard);
router.delete('/:id', validateJWT, validateCardId, deleteCard);

export default router;
