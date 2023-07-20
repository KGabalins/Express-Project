const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = (req, res, next) => {
  const token = req.headers["authorization"];

  // Check if json web token exists and is verified
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ message: "Not valid token!" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).send({ message: "No token specified!" });
  }
};

const authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(401).send({ message: `Not an ${role}` });
    }
    next();
  };
};

module.exports = {
  requireAuth,
  authRole,
};
