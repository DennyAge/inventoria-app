import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies.session_token;
  if (token) {
    try {
      const decoded = verifyToken(token);
      // @ts-ignore
      req.user = decoded;
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
  next();
};
