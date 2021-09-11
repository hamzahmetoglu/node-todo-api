const HttpException = require("../exceptions/HttpException");

module.exports = (req, res, next) => {
  next(new HttpException(404, "Resource not found."));
};
