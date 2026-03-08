const { Router } = require('express');
const { getTransactions } = require('./transaction.controller');
const { validateJWT } = require('../../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getTransactions);

module.exports = router;