export function requireAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You're not an admin!" });
    }
    return next();
}