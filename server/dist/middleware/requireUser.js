export function requireUser(req, res, next) {
    // @ts-ignore
    if (!req.user) {
        return res.status(401).json({ message: "You're not logged in!" });
    }
    return next();
}
