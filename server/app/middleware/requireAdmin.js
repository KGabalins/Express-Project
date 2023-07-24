function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(403).json({ message: "Invalid token!" });
  } 
  if(req.user.role !== "admin") {
    return res.status(403).json({ message: "You're not an admin!" });
  }

  return next();
}

module.exports = {
  requireAdmin,
};
