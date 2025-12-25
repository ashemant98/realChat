const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      require: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "user",
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("messages", messageSchema);

module.exports = {
  messageModel,
};
