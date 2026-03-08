const { Router } = require('express');
const { getAccounts, toggleAccountStatus, getMyAccount } = require('./account.controller');
const { validateJWT } = require('../../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getAccounts);
router.patch('/:id/status', validateJWT, toggleAccountStatus);
router.get('/my-account', validateJWT, getMyAccount);

module.exports = router;