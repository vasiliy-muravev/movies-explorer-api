const usersRoutes = require('express').Router();
const { updateUserValidator } = require('../validators/users');
const {
  getUser,
  updateUser,
} = require('../controllers/users');

/* Получение информации о пользователе  */
usersRoutes.get('/users/me', getUser);

/* Обновление информации о пользователе */
usersRoutes.patch('/users/me', updateUserValidator, updateUser);

module.exports = usersRoutes;
