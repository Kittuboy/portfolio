require("dotenv").config();

const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const Admin = require("./models/Admin");

async function seedAdmin() {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env"
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await Admin.findOneAndUpdate(
      { email },
      {
        email,
        passwordHash,
      },
      {
        upsert: true,
        new: true,
      }
    );

    console.log("Admin seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Admin seeding failed:", error);
    process.exit(1);
  }
}

seedAdmin();