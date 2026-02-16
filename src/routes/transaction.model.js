const { Router } = require('express');
const { getHistory } = require('../controllers/transaction.controller.js');
const { validateJWT } = require('../middlewares/validate-jwt');

console.log('¿Qué es getHistory?:', getHistory);

const router = Router();

router.get('/history', [validateJWT], getHistory); 

module.exports = router;