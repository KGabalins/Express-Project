const { Session } = require("../models/sessions");
const { verifyJWT, signJWT } = require("../utils/jwt.utils");

async function deserializeUser(req, res, next) {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken && refreshToken) {
    try {
      const sessionId = verifyJWT(refreshToken).payload.sessionId;
      console.log(sessionId);
      await Session.destroy({ where: { sessionId } });
      res.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
      });
      next();
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(accessToken);

  // For a valid access token
  if (payload) {
    req.user = payload;
    return next();
  }

  // Expired but valid access token
  const { payload: refresh } =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };

  if (!refresh) {
    return next();
  }

  try {
    const session = await Session.findOne({
      where: { sessionId: refresh.sessionId },
    });

    const newAccessToken = signJWT(
      {
        sessionId: session.sessionId,
        email: session.email,
        name: session.name,
        surname: session.surname,
        role: session.role,
      },
      "5s"
    );

    res.cookie("accessToken", newAccessToken, {
      maxAge: 60000, // 1 minutes
      httpOnly: true,
    });
    console.log(req.user);
    req.user = verifyJWT(newAccessToken).payload;
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }

  return next();
}

module.exports = { deserializeUser };
