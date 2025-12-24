import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/customError"; // import custom error class

// middleware to check the global-application based error
export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check the err wheather it is an instance of custom error or not (if not then assign status code 500)
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  // check the error wheather it is a instance of custom error or not (if not then pass the custom message to message)
  const message =
    err instanceof ApiError ? err.message : "Something went wrong";

  // and then send a generic error response to the client
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
