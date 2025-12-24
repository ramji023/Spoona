import { Request, Response } from "express"; // import express types for request and response
import jwt, { JwtPayload } from "jsonwebtoken"; // import jwt from jsonwebtoken package
//import zod schema validations object to validate user json data
import {
  imageValidation,
  loggerValidation,
  profileDataValidation,
} from "../validations/user.validation";
// import user model functions to perform database operations
import {
  createNewUser,
  findUserByEmail,
  findUserById,
  popularCreators,
  updateUser,
} from "../models/user.model";
// import helper functions to clean and normalize user request json data
import {
  makeLowerCase,
  removeExtraSpaces,
  removeUndefined,
} from "../utils/helper.functions";
// import custom error class to throw error
import { ApiError } from "../utils/customError";
// import token generator function to generate access and refresh token
import { tokenGenerator } from "../utils/tokenGenerator";

// signup controller to  handle user signup request
export const signup = async (req: Request, res: Response) => {
  const email = makeLowerCase(req.body.email); // clean and normalize user request email
  const password = removeExtraSpaces(req.body.password); // clean and normalize user request password

  // after cleaning and normalizing validate the user request data
  const parsedBodyObject = loggerValidation.safeParse({ email, password });
  // if validation fails then throw custom error
  if (!parsedBodyObject.success) {
    // throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 400);
  }
  // if validation is  successfull then check if user already exist with the same email or not
  const existedUser = await findUserByEmail(parsedBodyObject.data.email);

  // if user exist then throw custom error
  if (!existedUser) {
    throw new ApiError("User is already registered", 404);
  }

  // if user is not exist then call createNewUser model function to create new user in database
  await createNewUser({
    email: parsedBodyObject.data.email,
    password: parsedBodyObject.data.password,
  });

  // return success response to user
  return res.json({ message: "User successfully registered" });
};

//signin controller to handle user signin request
export const signin = async (req: Request, res: Response) => {
  // before validation do normalize the json data
  const email = makeLowerCase(req.body.email); // normalize user email
  const password = removeExtraSpaces(req.body.password); // normalize user password

  // after normalizing user inputs , validate user json data
  const parsedBodyObject = loggerValidation.safeParse({ email, password });

  // if validation failed then throw custom error
  if (!parsedBodyObject.success) {
    // throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 400);
  }

  // if validation passed then check if user exist or not
  const result = await findUserByEmail(parsedBodyObject.data.email);

  // if user is not exist then return custom error
  if (!result) {
    // throw error
    throw new ApiError("User is not found", 404);
  }

  // if user exist then check the saved password with user input password
  // if input password is wrong then throw custom error
  if (result.password !== password) {
    //throw error
    throw new ApiError("Password is wrong", 400);
  }

  // if password is same
  // then call tokenGenerator function to generate the access and refresh token
  const { accessToken, refreshToken } = tokenGenerator({
    id: result.id,
    email: result.email,
  });

  // secure cookie
  const options = {
    secure: true,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "none" as const,
  };

  // set the refresh token of user as a cookie
  res.cookie("refreshToken", refreshToken, options);
  // return the success response to user
  return res.json({
    data: { accessToken, name: result.username, id: result.id },
    message: "User successfully logged in",
  });
};

// signout controller to handle user logout operation
export const signout = async (req: Request, res: Response) => {
  // first clear the cookie from user browser cookie
  res.clearCookie("refreshToken");
  // then return the success response to user
  return res.json({ message: "User successfully logged out" });
};

// controller to get the profile data of that user
export const getProfileData = async (req: Request, res: Response) => {
  // first check that user is exist or not in user table
  const existedUser = await findUserById({ id: req.user as string });
  // if existedUser is invalid then throw custom error (user does not exist in database)
  if (!existedUser) {
    //throw error
    throw new ApiError("User does not exist", 400);
  }

  // if user exist then return the profile data to the user
  return res.json({
    data: existedUser,
    message: "fetch user profile data successfully",
  });
};

// controller to update the profile data of user
export const updateProfile = async (req: Request, res: Response) => {
  // before validation do normalize the json data
  // const username = req.body.username
  //   ? removeExtraSpaces(req.body.username)
  //   : undefined;
  // const bio = req.body.bio ? removeExtraSpaces(req.body.bio) : undefined;
  console.log("hit updated profile route")
  console.log(req.body)
  const normalizeData = removeUndefined(req.body); // first normalize the data remove undefined values from object
  console.log('normalize data : ',normalizeData)
  // then pass the normalize data to zod schema for validation
  const parsedBodyObject = profileDataValidation.safeParse(normalizeData);
  console.log("after validation : ",parsedBodyObject)
  // if validation failed then send the custom error
  if (!parsedBodyObject.success) {
    //throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 400);
  }

  // and if validation pass then call the updateUser model to update the user data
  const result = await updateUser({
    userId: req.user!,
    data: normalizeData,
  });

  // and then return the success response to user
  return res.json({ message: "user updated profile data successfully" });
};


// write controller to generate new access token and refresh token
export const refreshedToken = async (req: Request, res: Response) => {
  // console.log("Cookies from client:", req.cookies);
  // first check if there is refreshToken cookie present in client request or not
  const token = req.cookies.refreshToken;
  // console.log("refresh token : ", token);

  // if refreshToken is not present then throw custom error to user
  if (!token) {
    //throw error
    throw new ApiError("Refresh token is missing", 404);
  }
  // if refreshToken is present then verify the refresh token using jwt.verify()
  const verifiedToken = jwt.verify(
    token,
    process.env.REFRESH_TOKEN_KEY!
  ) as JwtPayload;
  // console.log("verified token : ", verifiedToken);
  // if there is no verified token then throw custom error
  if (!verifiedToken) {
    //throw error
    throw new ApiError("Invalid refresh token", 404);
  }

  // if token is properly verified then check if user is present in database or not
  // find that user by id
  const user = await findUserById({ id: verifiedToken.id });
  // console.log("user from refreshed token : ", user);
  // if user is not found then throw custom error
  if (!user) {
    //throw error
    throw new ApiError("User not found", 404);
  }

  // if user is present in database then call tokenGenerator function to generate new access and refresh token
  // create access and refresh token
  const { accessToken, refreshToken } = tokenGenerator({
    id: user.id,
    email: user.email,
  });

  // secure cookie
  const options = {
    secure: true,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "none" as const,
  };

  // set the refreshToken as cookie
  res.cookie("refreshToken", refreshToken, options);
  // return the success response to user
  return res.json({
    data: { accessToken, id: user.id },
    message: "User successfully refreshed the token",
  });
};

// write controller to get all the popular creators
export const getPopularCreators = async (req: Request, res: Response) => {
  // fetch all the users data
  const creators = await popularCreators();

  // return success response to the user
  return res.json({
    data: creators,
    message: "Fetch all the popular creators data",
  });
};
