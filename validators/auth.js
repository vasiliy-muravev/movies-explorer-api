const { celebrate, Joi } = require('celebrate');

module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
