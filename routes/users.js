const usersRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createUser,
  login,
  getUser,
  updateUser
} = require('../controllers/users');

/* Регистрация */
usersRoutes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), createUser);

module.exports = usersRoutes;

/* Логин */
usersRoutes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

/* Получение информации о пользователе  */
usersRoutes.get('/me', getUser);

/* Обновлние информации о пользователе */
usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);
