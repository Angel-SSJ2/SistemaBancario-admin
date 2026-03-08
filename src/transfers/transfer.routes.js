const { Router } = require('express');
const { createTransfer } = require('./transfer.controller');
const { validateJWT } = require('../../middlewares/validate-jwt');

const router = Router();

router.post('/', validateJWT, createTransfer);

module.exports = router;