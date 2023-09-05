import { Request, Response, NextFunction } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if(req.user.role !== "admin") {
    console.log("What")
    return res.status(403).json({ message: "You're not an admin!" });
  }

  return next();
}

