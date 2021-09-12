const Joi = require("joi");

module.exports = {
  createTodo: Joi.object().keys({
    task: Joi.string().required().min(4),
  }),
  updateTodo: Joi.object().keys({
    task: Joi.string().min(4).optional(),
    status: Joi.string().optional().valid("active", "completed"),
  }),
};
