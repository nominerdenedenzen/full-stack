import { User } from "../models/userSchema";

const validateEmailAndPassword = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  } else {
    next();
  }
};

const checkIfUserExist = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "User not fond" });
  } else {
    req.user = user;
    next();
  }
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({
      message: "User not found",
    });
  } else {
    next();
  }
};
