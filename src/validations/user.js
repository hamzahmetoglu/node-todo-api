const Joi = require("joi");

module.exports = {
  register: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(4),
  }),
  login: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(4),
  }),
};
