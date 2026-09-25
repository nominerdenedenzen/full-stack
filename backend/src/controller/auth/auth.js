import bcrypt from "bcryptjs";
import { User } from "../../models/userSchema.js";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "nomin_secret";

const publicUser = (user) => {
  return {
    email: user.email,
    role: user.role,
    _id: user._id,
  };
};

export const createToken = (user) => {
  return jwt.sign(
    { email: user.email, role: user.role, id: user._id },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPassMatching = await bcrypt.compare(password, user.password);

    if (!isPassMatching) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: publicUser(user),
    });
  } catch (err) {
    console.log("Login Error:", err);
    res
      .status(500)
      .json({ message: "Failed to login user", error: err.message });
  }
};

export const signUpController = async (req, res) => {
  const { email, password, phoneNumber, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    const token = createToken(user);

    res.status(200).json({
      message: "User Created",
      token,
      user: publicUser(user),
    });
  } catch (err) {
    console.log("Sign-up Error:", err);
    res
      .status(500)
      .json({ message: "Failed to create user", error: err.message });
  }
};
