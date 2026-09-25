import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const requireToken = async (req, res, next) => {
  console.log("Headers:", req.headers);

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
