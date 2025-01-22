import express from "express";
import { verifyToken } from "../lib";

interface User {
  id: string;
  email: string;
}

export const isAuthUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const sessionToken = req.cookies.session_token;
    if (!sessionToken) {
      throw new Error("403 Forbidden");
    }

    const existingUser = verifyToken(sessionToken) as User;

    if (!existingUser) {
      throw new Error("403 Forbidden");
    }

    return existingUser;
  } catch (error) {
    throw new Error(error || "Internal server error");
  }
};
