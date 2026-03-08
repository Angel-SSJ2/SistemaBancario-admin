const { Router } = require('express');
const { getUsers, updateUser, deactivateUser } = require('./user.controller');
const { validateJWT } = require('../../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUsers);
router.put('/:id', validateJWT, updateUser);
router.delete('/:id', validateJWT, deactivateUser);

module.exports = router;