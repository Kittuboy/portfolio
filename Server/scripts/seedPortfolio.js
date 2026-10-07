require("dotenv").config();

const connect = require("../config/db");
const Profile = require("../models/Profile");
const Project = require("../models/Project");

const projects = [
  {
    title: "HealthCom",
    slug: "healthcom",
    shortDescription:
      "AI-powered healthcare appointment and management platform.",
    description:
      "AI-powered healthcare appointment and management platform.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Socket.IO",
    ],
    liveUrl: "https://healthcombackend.onrender.com/",
    githubUrl: "https://github.com/Kittuboy/HealthComBackend",
    featured: true,
    order: 1,
    features: [
      "Patient and doctor authentication",
      "Appointment management",
      "Admin portal",
      "Real-time communication",
    ],
  },

  {
    title: "Stainless Steel E-Commerce",
    slug: "stainless-steel-ecommerce",
    shortDescription:
      "Full-stack e-commerce platform for stainless steel products.",
    description:
      "Full-stack e-commerce platform for stainless steel products.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Cloudinary",
      "JWT",
    ],
    liveUrl: "https://stainlesssteel.onrender.com/",
    githubUrl: "https://github.com/Kittuboy/StainlessSteel",
    featured: true,
    order: 2,
    features: [
      "Product management",
      "Image upload",
      "Responsive UI",
      "E-commerce functionality",
    ],
  },

  {
    title: "Expense Tracker",
    slug: "expense-tracker",
    shortDescription:
      "A responsive expense tracking application for managing personal expenses.",
    description:
      "A responsive expense tracking application for managing personal expenses.",
    technologies: ["React.js", "JavaScript", "Node.js", "MongoDB"],
    order: 3,
  },

  {
    title: "Streamlined Communication",
    slug: "streamlined-communication",
    shortDescription:
      "A communication-focused academic project developed during BCA.",
    description:
      "A communication-focused academic project developed during BCA.",
    technologies: ["HTML", "CSS", "JavaScript"],
    order: 4,
  },

  {
    title: "Music Player",
    slug: "music-player",
    shortDescription:
      "A mobile music player application developed using Flutter.",
    description:
      "A mobile music player application developed using Flutter.",
    technologies: ["Flutter", "Dart"],
    order: 5,
  },
];

async function seedPortfolio() {
  try {
    await connect();

    await Profile.findOneAndUpdate(
      {},
      {
        name: "Vikas Ranjave",
        headline: "Full Stack Developer",
        bio: "Full Stack Developer focused on building responsive, scalable and user-friendly web applications using React.js, Node.js, Express.js, MongoDB and Java.",
        email: "",
        location: "India",
        github: "https://github.com/Kittuboy",
        linkedin: "https://www.linkedin.com/in/vikas-ranjave",
        availability: "Available for Opportunities",
      },
      {
        upsert: true,
        new: true,
      }
    );

    for (const project of projects) {
      await Project.findOneAndUpdate(
        { slug: project.slug },
        project,
        {
          upsert: true,
          new: true,
        }
      );
    }

    console.log("Portfolio seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedPortfolio();