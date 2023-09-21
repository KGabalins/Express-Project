export function requireAdmin(req, res, next) {
    // @ts-ignore
    if (req.user.role !== "admin") {
        console.log("What");
        return res.status(403).json({ message: "You're not an admin!" });
    }
    return next();
}
