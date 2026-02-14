// src/routes/transactions.routes.js
const { Router } = require('express');
const validateJWT = require('../middlewares/validate-jwt');
const { getTransactions } = require('../controllers/transactions.controller');

const router = Router();

// Ver transacciones → cualquier usuario autenticado
router.get('/', validateJWT, getTransactions);

module.exports = router;
