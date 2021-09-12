const Joi = require("joi");
const jwt = require("jsonwebtoken");

module.exports = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Something went wrong";
  let errors = [];

  if (err instanceof Joi.ValidationError) {
    status = 400;
    message = "Validation Error";

    for (let index = 0; index < err.details.length; index++) {
      const detail = err.details[index];

      errors.push({
        field: detail.context.label,
        message: detail.message,
      });
    }
  }

  if (err instanceof jwt.JsonWebTokenError) {
    if (err.message == "invalid token") {
      message = "Invalid Token";
    }
  }

  res.status(status).json({
    error: {
      message,
      errors,
    },
  });
};
