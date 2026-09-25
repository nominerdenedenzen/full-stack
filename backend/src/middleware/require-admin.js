export const requireAdmin = async (req, res, next) => {
  const user = req.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  next();
};
