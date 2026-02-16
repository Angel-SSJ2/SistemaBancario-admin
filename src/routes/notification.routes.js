const { Router } = require('express');
const { getNotifications } = require('../controllers/notification.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getNotifications);

module.exports = router;
