const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Profile",
  new mongoose.Schema(
    {
      name: String,
      headline: String,
      bio: String,
      email: String,
      location: String,
      github: String,
      linkedin: String,
      resumeUrl: String,
      availability: String,

      skills: [mongoose.Schema.Types.Mixed],
      education: [mongoose.Schema.Types.Mixed],
      experience: [mongoose.Schema.Types.Mixed],
    },
    {
      timestamps: true,
    }
  )
);