function requireUser(req, res, next) {
  if (!req.user) {
    return res.status(403).json({ message: "Invalid token!" });
  }

  return next();
}

module.exports = {
  requireUser,
};
