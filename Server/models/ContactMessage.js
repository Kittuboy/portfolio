const mongoose = require("mongoose");

module.exports = mongoose.model(
  "ContactMessage",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      subject: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: ["unread", "read", "replied"],
        default: "unread",
      },
    },
    {
      timestamps: true,
    }
  )
);