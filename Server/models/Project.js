const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Project",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      slug: {
        type: String,
        unique: true,
        index: true,
      },

      shortDescription: String,
      description: String,

      technologies: [String],

      image: String,
      liveUrl: String,
      githubUrl: String,

      featured: Boolean,
      order: Number,

      features: [String],

      problem: String,
      solution: String,
      challenges: String,
      learned: String,
    },
    {
      timestamps: true,
    }
  )
);