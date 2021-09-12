const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;

        delete ret.password;
        delete ret._id;
      },
    },
  }
);

schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
  next();
});

schema.methods.comparePassword = function (value) {
  return bcrypt.compare(value, this.password);
};

module.exports = mongoose.model("user", schema);
