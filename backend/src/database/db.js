import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  const mongoDB = process.env.MONGO_DB;
  try {
    await mongoose.connect(mongoDB);
    console.log("Database connected successfully connection success");
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw error;
  }
};
