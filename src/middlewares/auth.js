const HttpException = require("../exceptions/HttpException");
const jwt = require("../utils/jwt");

module.exports = (req, res, next) => {
  const token = req.headers?.token;

  if (token) {
    const user = jwt.verify(token);

    if (user) {
      req.user = user;
      next();
    }
  } else {
    next(new HttpException(403, "Authorization header must be provided"));
  }
};
