import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const mongodb = process.env.MONGO_DB;
    await mongoose.connect(mongodb);
    console.log("Database connection successful");
  } catch (error) {
    console.log("Database error:", error.message);
  }
};
