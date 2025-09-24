import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/customError";
export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.headers);
  // console.log(req.header("Authorization"));
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log(token);
  if (!token) {
    //throw error
    throw new ApiError("User do not have token", 401);
  }

  try {
    const verifiedToken = jwt.verify(
      token,
      process.env.ACCESS_SECRET_KEY!
    ) as JwtPayload;

    console.log(verifiedToken);
    req.user = verifiedToken.id;
    next();
  } catch (err) {
    // throw error
    throw new ApiError("Invalid Token", 401);
  }
};
