const { Router } = require('express');
const { getCurrencies, createCurrency, updateExchangeRate } = require('./currency.controller');
const { validateJWT } = require('../../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getCurrencies);
router.post('/', validateJWT, createCurrency);
router.put('/:id', validateJWT, updateExchangeRate);

module.exports = router;