const { Router } = require('express');
const { getHistory } = require('../controllers/deposit.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/history', validateJWT, getHistory);

module.exports = router;
