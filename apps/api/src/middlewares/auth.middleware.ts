import { Request, Response, NextFunction } from "express"; // import express types
import jwt, { JwtPayload } from "jsonwebtoken"; // import jwt to verify the token
import { ApiError } from "../utils/customError"; // import custom error class to send error to client

// middleware function to check wheather user is authenticated or not before passing it to controllers
export const AuthMiddleware = (
  req: Request, // express request 
  res: Response,
  next: NextFunction // next function to move to next middleware
) => {
  // console.log(req.headers);
  // console.log(req.header("Authorization"));
  const token = req.header("Authorization")?.replace("Bearer ", ""); // check if token is present in the user request header or not
  // console.log(token); //log the token data
  // if token is not present then throw custom error
  if (!token) {
    //throw error
    throw new ApiError("User do not have token", 401);
  }

  // if token is present then verify the token using jwt.verify()
  try {
    // call jwt.verify() function to verify the token
    const verifiedToken = jwt.verify(
      token,
      process.env.ACCESS_SECRET_KEY!
    ) as JwtPayload;

    // console.log(verifiedToken);// log the decoded token data
    req.user = verifiedToken.id; // set the decoded token data id to req.user
    next(); // call the next() function to move to next middleware
  } catch (err) {
    // if there is any error while verifying the token then throw error to user
    // throw error
    throw new ApiError("Invalid Token", 401);
  }
};
