const jwt = require("jsonwebtoken");

// Sign JWT
const signJWT = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
}

// Verify JWT
const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return {payload: decoded, expired: false}
  } catch (error) {
    return {payload: null, expired: true}
  }
}

module.exports = {
  signJWT,
  verifyJWT
}