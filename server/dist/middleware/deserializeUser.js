import Session from "../models/session.model.js";
import { verifyJWT, signJWT } from "../utils/jwt.utils.js";
export async function deserializeUser(req, res, next) {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken)
        return next();
    const { payload, expired } = verifyJWT(accessToken);
    // For a valid access token
    if (payload) {
        req.user = payload;
        return next();
    }
    // Expired but valid access token
    const { payload: refresh } = expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };
    if (!refresh) {
        return next();
    }
    try {
        const session = await Session.findOne({
            where: { sessionId: refresh.sessionId },
        });
        if (!session)
            return next();
        const newAccessToken = signJWT({
            email: session.email,
            name: session.name,
            surname: session.surname,
            role: session.role,
            sessionId: session.sessionId,
        }, "15m");
        res.cookie("accessToken", newAccessToken, {
            maxAge: 1.8e6,
            httpOnly: true,
        });
        req.user = verifyJWT(newAccessToken).payload;
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
    return next();
}
