// src/routes/admin.routes.js
const { Router } = require('express');
const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/is-admin');
const { getAllUsers, deleteUser } = require('../controllers/admin.controller');

const router = Router();

// Todas estas rutas solo ADMIN_ROLE
router.get('/users', [validateJWT, validateRole('ADMIN_ROLE')], getAllUsers);
router.delete('/users/:id', [validateJWT, validateRole('ADMIN_ROLE')], deleteUser);

module.exports = router;
