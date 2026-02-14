// src/routes/account.routes.js
const { Router } = require('express');
const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/is-admin');
const { getAccounts, createAccount } = require('../controllers/account.controller');

const router = Router();

// Ver cuentas → cualquier usuario autenticado
router.get('/', validateJWT, getAccounts);

// Crear cuenta → solo ADMIN_ROLE
router.post('/', [validateJWT, validateRole('ADMIN_ROLE')], createAccount);

module.exports = router;
