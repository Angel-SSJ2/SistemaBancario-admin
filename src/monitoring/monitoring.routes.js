const { Router } = require('express');
const { getLogs } = require('./monitoring.controller');
const { validateJWT } = require('../../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getLogs);

module.exports = router;