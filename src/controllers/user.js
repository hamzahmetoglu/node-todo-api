const userService = require("../services/user");

const register = async (req, res, next) => {
  const userData = req.body;

  await userService
    .register(userData)
    .then((newUser) => {
      res.json(newUser);
    })
    .catch((err) => {
      next(err);
    });
};

const login = async (req, res, next) => {
  const userData = req.body;

  await userService
    .login(userData)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { register, login };
