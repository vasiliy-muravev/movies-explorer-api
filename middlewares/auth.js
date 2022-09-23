const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization;

  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
