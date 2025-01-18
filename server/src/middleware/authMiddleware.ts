import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies.session_token;

  console.log(token);
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = verifyToken(token);
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
