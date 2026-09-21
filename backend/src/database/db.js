import mongoose from "mongoose";

export const connectDB = async () => {
  const connectionString =
    "mongodb+srv://nomindenzen0601_db_user:MongoDb123@database.sd91ykz.mongodb.net/";
  try {
    mongoose.connect(connectionString);
    console.log("db connection success");
  } catch (error) {
    console.error("db error");
  }
};
