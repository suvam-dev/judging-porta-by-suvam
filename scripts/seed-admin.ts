import mongoose from "mongoose";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

async function seedAdmin() {
  try {
    console.log("Connecting to the database...");
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected successfully.");

    const email = "admin@ecell-iitkgp.in";
    const plainPassword = "EcellAdmin_2026_!Secure";

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log(`Admin with email ${email} already exists.`);
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(plainPassword, 10);

    const newAdmin = new User({
      username: "admin_ecell",
      email: email,
      passwordHash: passwordHash,
      firstName: "E-Cell",
      lastName: "Admin",
      role: "admin",
      status: "active"
    });

    await newAdmin.save();

    console.log(`✅ Admin user seeded successfully!`);
    console.log(`Email: ${email}`);
    
  } catch (error) {
    console.error("Error seeding admin:", error);
  } finally {
    console.log("Disconnecting...");
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedAdmin();
