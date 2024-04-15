export const isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.json({ message: "Unauthorized" });
};
