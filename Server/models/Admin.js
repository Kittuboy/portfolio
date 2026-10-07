const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Admin",
  new mongoose.Schema(
    {
      email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
      },
      passwordHash: String,
    },
    {
      timestamps: true,
    }
  )
);