import jwt from "jsonwebtoken";

// Sign JWT
export const signJWT = (payload: object, expiresIn: string | number) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
}

// Verify JWT
export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return {payload: decoded, expired: false}
  } catch (error) {
    return {payload: null, expired: error.message}
  }
}
