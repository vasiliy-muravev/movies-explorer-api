const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');require('dotenv').config();
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');

const { NODE_ENV, JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => res.status(201).send(user.deletePasswordFromUser()))
        .catch((error) => {
          if (error.name === 'ValidationError') {
            next(new BadRequestError(`Переданы некорректные данные для создания пользователя ${error.message}`));
          } else if (error.name === 'MongoServerError' && error.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже существует'));
          } else {
            next(error);
          }
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Неверная почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((isValidPassword) => {
          if (!isValidPassword) {
            return next(new UnauthorizedError('Неверная почта или пароль'));
          }

          const token = jwt.sign(
            { _id: user.id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );

          return res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
            .send({ token, user });
        })
        .catch(next);
    });
};
