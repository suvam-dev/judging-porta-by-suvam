import mongoose from "mongoose";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

async function clearDatabase() {
  try {
    console.log("Connecting to the database...");
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected successfully.");

    const db = mongoose.connection.db;
    if (!db) {
       console.error("No database connection available.");
       process.exit(1);
    }
    
    // Get all collections
    const collections = await db.collections();

    if (collections.length === 0) {
      console.log("No collections found in the database. Exiting...");
      process.exit(0);
    }

    console.log("WARNING: This will delete ALL documents in the following collections:");
    for (const collection of collections) {
      console.log(` - ${collection.collectionName}`);
    }

    console.log("\nClearing collections...");

    for (const collection of collections) {
      await collection.deleteMany({});
      console.log(`Cleared collection: ${collection.collectionName}`);
    }

    console.log("\n✅ Database cleared successfully.");
  } catch (error) {
    console.error("Error clearing database:", error);
  } finally {
    console.log("Disconnecting...");
    await mongoose.disconnect();
    process.exit(0);
  }
}

clearDatabase();
