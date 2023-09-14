import { getSessionById } from "../service/session.service.js";
import { signAccessJWT, verifyAccessJWT, verifyRefreshJWT } from "../utils/jwt.utils.js";
export async function deserializeUser(req, res, next) {
    // console.log(req.headers)
    // if (req.headers.authorization === "testing-admin") {
    //   // @ts-ignore
    //   req.user = { name: "tester", surname: "tester", email: "tester@tester.com", role: "admin" }
    //   return next()
    // } else if (req.headers.authorization === "testing-user") {
    //   // @ts-ignore
    //   req.user = { name: "tester", surname: "tester", email: "tester@tester.com", role: "user" }
    //   return next()
    // }
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken)
        return next();
    const { payload, expired } = verifyAccessJWT(accessToken);
    // For a valid access token
    if (payload) {
        // @ts-ignore
        // const sessionExists = await getSessionById(payload.sessionId)
        // if (!sessionExists) {
        //   return next();
        // }
        // @ts-ignore
        req.user = payload;
        return next();
    }
    // Expired but valid access token
    const { payload: refresh } = expired && refreshToken ? verifyRefreshJWT(refreshToken) : { payload: null };
    if (!refresh) {
        return next();
    }
    try {
        // @ts-ignore
        const session = await getSessionById(refresh.sessionId);
        if (!session)
            return next();
        const newAccessToken = await signAccessJWT(session.email, session.sessionId, "5m");
        res.cookie("accessToken", newAccessToken, {
            maxAge: 1.8e6,
            httpOnly: true,
        });
        // @ts-ignore
        req.user = verifyAccessJWT(newAccessToken).payload;
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
    return next();
}
