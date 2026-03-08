const { Router } = require('express');
const { createPayment } = require('./payment.controller');
const { validateJWT } = require('../../middlewares/validate-jwt');

const router = Router();

router.post('/', validateJWT, createPayment);

module.exports = router;