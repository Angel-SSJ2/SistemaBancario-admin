const { Router } = require('express');
const { getRoles, createRole } = require('./role.controller');
const { validateJWT } = require('../../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getRoles);
router.post('/', validateJWT, createRole);

module.exports = router;