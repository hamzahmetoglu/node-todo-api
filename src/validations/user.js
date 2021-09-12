const Joi = require("joi");

module.exports = {
  register: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(4),
    })
    .options({
      abortEarly: false,
    }),
  login: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(4),
    })
    .options({
      abortEarly: false,
    }),
};
