import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    //throw error
    return;
  }

  const verifiedToken = jwt.verify(
    token,
    process.env.ACCESS_SECRET_KEY!
  ) as JwtPayload;

  if (!verifiedToken) {
    //throw error
    return;
  }
  req.user = verifiedToken.userId;
  next();
};
