function requireUser(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "You're not logged in!" });
  }

  return next();
}

module.exports = {
  requireUser,
};
