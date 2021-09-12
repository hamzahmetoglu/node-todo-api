const userModel = require("../models/user");
const jwt = require("../utils/jwt");
const userValidation = require("../validations/user");

const register = async (userData) => {
  return new Promise(async (resolve, reject) => {
    const { email } = userData;

    await userValidation.register
      .validateAsync(userData)
      .then(async (validatedUserData) => {
        await userModel
          .findOne({
            email,
          })
          .then(async (user) => {
            if (!user) {
              const newUser = new userModel(validatedUserData);

              await newUser
                .save()
                .then((result) => {
                  const token = jwt.sign({ id: result._id });
                  resolve({ token });
                })
                .catch((err) => {
                  reject(err);
                });
            } else {
              reject({
                message: "The email has already been taken.",
              });
            }
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const login = (userData) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userData;

    await userValidation.login
      .validateAsync(userData)
      .then(async (validatedUserData) => {
        await userModel
          .findOne({ email })
          .then(async (user) => {
            if (user) {
              const isValid = await user.comparePassword(password);

              if (isValid) {
                const token = jwt.sign({ id: user._id });
                return resolve({ token });
              }
            }

            reject({ message: "Invalid email/password!" });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = { register, login };
