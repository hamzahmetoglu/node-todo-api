const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["deleted", "active", "completed"],
      default: "active",
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
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model("todo", schema);
