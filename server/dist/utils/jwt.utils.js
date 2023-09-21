import jwt from "jsonwebtoken";
import { getUserData } from "../service/user.service.js";
import dotenv from "dotenv";
dotenv.config();
// Sign Access JWT
export const signAccessJWT = async (email, sessionId, expiresIn) => {
    const userData = await getUserData(email);
    return jwt.sign({ sessionId, ...userData }, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
};
// Sign Access JWT
export const signTestJWT = (payload, expiresIn) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
};
// Sign Refresh JWT
export const signRefreshJWT = (sessionId, expiresIn) => {
    return jwt.sign({ sessionId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn });
};
// Verify Access JWT
export const verifyAccessJWT = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        return { payload: null, expired: error.message };
    }
};
// Verify Refresh JWT
export const verifyRefreshJWT = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        return { payload: null, expired: error.message };
    }
};
