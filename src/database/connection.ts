import mongoose from "mongoose";
import { env } from "@config/env";
const MONGODB_URI = env.MONGODB_URI;

export const connectDatabase = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
