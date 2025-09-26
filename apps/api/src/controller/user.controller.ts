import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  imageValidation,
  loggerValidation,
  profileDataValidation,
} from "../validations/user.validation";
import {
  createNewUser,
  findUser,
  findUserById,
  updateUser,
} from "../models/user.model";
import { makeLowerCase, removeExtraSpaces } from "../utils/helper.functions";
import { ApiError } from "../utils/customError";
import { tokenGenerator } from "../utils/tokenGenerator";

//signup controller
export const signup = async (req: Request, res: Response) => {
  // before validation do normalize the json data
  const email = makeLowerCase(req.body.email);
  const password = removeExtraSpaces(req.body.password);
  const parsedBodyObject = loggerValidation.safeParse({ email, password });
  if (!parsedBodyObject.success) {
    // throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 400);
  }
  // create new user in db
  await createNewUser({
    email: parsedBodyObject.data.email,
    password: parsedBodyObject.data.password,
  });

  return res.json({ message: "User successfully registered" });
};

//signin controller
export const signin = async (req: Request, res: Response) => {
  // before validation do normalize the json data
  const email = makeLowerCase(req.body.email);
  const password = removeExtraSpaces(req.body.password);
  const parsedBodyObject = loggerValidation.safeParse({ email, password });
  if (!parsedBodyObject.success) {
    // throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 400);
  }
  // check if user exist or not
  const result = await findUser({ email: parsedBodyObject.data.email });

  if (!result) {
    // throw error
    throw new ApiError("User is not found", 404);
  }

  // match password
  if (result.password !== password) {
    //throw error
    throw new ApiError("Password is wrong", 400);
  }

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

  res.cookie("refreshToken", refreshToken, options);
  return res.json({
    data: { accessToken, name: result.username },
    message: "User successfully logged in",
  });
};

//signout controller
export const signout = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  return res.json({ message: "User successfully logged out" });
};

// get profile data controller
export const getProfileData = async (req: Request, res: Response) => {
  const existedUser = await findUserById({ id: req.user! });
  if (!existedUser) {
    //throw error
    throw new ApiError("User does not exist", 400);
  }
  const payload = {
    username: existedUser.username,
    email: existedUser.email,
    bio: existedUser.bio,
    profileImage: existedUser.profileImage,
  };
  return res.json({
    data: payload,
    message: "fetch user profile data successfully",
  });
};

// update profile controller
export const updateProfile = async (req: Request, res: Response) => {
  // before validation do normalize the json data
  const username = req.body.username
    ? removeExtraSpaces(req.body.username)
    : undefined;
  const bio = req.body.bio ? removeExtraSpaces(req.body.bio) : undefined;
  const parsedBodyObject = profileDataValidation.safeParse({
    username,
    bio,
  });
  if (!parsedBodyObject.success) {
    //throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 400);
  }

  //update profile data
  const result = await updateUser({
    userId: req.user!,
    username: parsedBodyObject.data.username,
    bio: parsedBodyObject.data.bio,
  });

  return res.json({ message: "user updated profile data successfully" });
};

// change profileImage
export const changeAvatar = async (req: Request, res: Response) => {
  const data = req.body;
  const parsedBodyObject = imageValidation.safeParse(data);

  if (!parsedBodyObject.success) {
    //throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 400);
  }

  //update profile avatar
  const result = await updateUser({
    userId: req.user!,
    profileImage: parsedBodyObject.data.profileImage,
  });

  if (!result.profileImage) {
    //throw error
    throw new ApiError("Something went wrong while changing Avatar", 500);
  }

  return res.json({ message: "user updated his avatar successfully" });
};

// delete account controller
export const deleteAccount = (req: Request, res: Response) => {};

// refreshed refreshToken and accessToken
export const refreshedToken = async (req: Request, res: Response) => {
  // console.log("Cookies from client:", req.cookies);
  const token = req.cookies.refreshToken;
  console.log("refresh token : ", token);
  if (!token) {
    //throw error
    throw new ApiError("Refresh token is missing", 404);
  }
  const verifiedToken = jwt.verify(
    token,
    process.env.REFRESH_TOKEN_KEY!
  ) as JwtPayload;
  // console.log("verified token : ", verifiedToken);
  if (!verifiedToken) {
    //throw error
    throw new ApiError("Invalid refresh token", 404);
  }

  // find that user by id
  const user = await findUserById({ id: verifiedToken.id });
  // console.log("user from refreshed token : ", user);
  if (!user) {
    //throw error
    throw new ApiError("User not found", 404);
  }

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

  res.cookie("refreshToken", refreshToken, options);
  return res.json({
    data: accessToken,
    message: "User successfully refreshed the token",
  });
};
