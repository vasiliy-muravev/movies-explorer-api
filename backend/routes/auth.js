const authRoutes = require('express').Router();
const { createUserValidator, loginValidator } = require('../validators/auth');
const {
  createUser,
  login,
} = require('../controllers/users');

/* Регистрация */
authRoutes.post('/signup', createUserValidator, createUser);

/* Логин */
authRoutes.post('/signin', loginValidator, login);

module.exports = authRoutes;
