const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    room_id: {
      type: String,
      required: true,
    },
    sender_id: {
      type: String,
      required: true,
    },
    receiver_id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("messages", messagesSchema);

module.exports = MessageModel;


