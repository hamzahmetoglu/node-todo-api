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

    created_by_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    updated_by_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
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
        delete ret.user_id;
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model("todo", schema);
