const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
const token = req.header('x-token');

};

module.exports = { validateJWT };