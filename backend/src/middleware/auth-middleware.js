import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

const JWT_SECRET = process.env.JWT_SECRET || "nomin_secret";

export const validateEmailAndPassword = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  next();
};

export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  next();
};

export const checkIfUserExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

export const requireToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || null;
  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token, try again" });
  }
};

export const requireAdmin = async (req, res, next) => {
  const user = req.user;
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};
