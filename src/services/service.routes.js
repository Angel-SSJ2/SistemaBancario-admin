const { Router } = require('express');
const { getServices, createService } = require('./service.controller');
const { validateJWT } = require('../../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getServices);
router.post('/', validateJWT, createService);

module.exports = router;