import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" }, //enum ni ene hoyriin ali neg ni baih yostoi hetrehgui,
  },
  {
    timestamp: true,
  },
);
export const User = mongoose.model("user", userSchema);
