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

//signin controller
export const signin = async (req: Request, res: Response) => {
  const data = req.body;
  const parsedBodyObject = loggerValidation.safeParse(data);
  if (!parsedBodyObject.success) {
    // throw error
    return;
  }
  // create new user in db
  const result = await createNewUser({
    email: parsedBodyObject.data.email,
    password: parsedBodyObject.data.password,
  });

  if (!result) {
    // throw error
    return;
  }

  return res.json({ message: "User successfully registered" });
};

//signup controller
export const signup = async (req: Request, res: Response) => {
  const data = req.body;
  const parsedBodyObject = loggerValidation.safeParse(data);
  if (!parsedBodyObject.success) {
    // throw error
    return;
  }
  // check if user exist or not
  const result = await findUser({ email: parsedBodyObject.data.email });

  if (!result) {
    // throw error
    return;
  }

  // create token for user
  return res.json({ message: "User successfully logged in" });
};

// update profile controller
export const updateProfile = async (req: Request, res: Response) => {
  const data = req.body;
  const parsedBodyObject = profileDataValidation.safeParse(data);

  if (!parsedBodyObject.success) {
    //throw error
    return;
  }

  //update profile data

  const result = await updateUser({
    userId: req.user!,
    username: parsedBodyObject.data.username,
    bio: parsedBodyObject.data.bio,
    profileImage: parsedBodyObject.data.profileImage,
  });

  if (!result) {
    //throw error
    return;
  }

  return res.json({ message: "user updated profile data successfully" });
};

// change profileImage
export const changeAvatar = async (req: Request, res: Response) => {
  const data = req.body;
  const parsedBodyObject = imageValidation.safeParse(data);

  if (!parsedBodyObject.success) {
    //throw error
    return;
  }

  //update profile avatar
  const result = await updateUser({
    userId: req.user!,
    profileImage: parsedBodyObject.data.profileImage,
  });

  if (!result) {
    //throw error
    return;
  }

  return res.json({ message: "user updated his avatar successfully" });
};

// get profile data controller
export const getProfileData = async (req: Request, res: Response) => {
  const existedUser = await findUserById({ id: req.user! });
  if (!existedUser) {
    //throw error
    return;
  }

  return res.json({
    data: existedUser,
    message: "fetch user profile data successfully",
  });
};

// delete account controller
export const deleteAccount = (req: Request, res: Response) => {};

// refreshed refreshToken and accessToken
export const refreshedToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    //throw error
    return;
  }
  const verifiedToken = jwt.verify(
    token,
    process.env.REFRESH_TOKEN_KEY!
  ) as JwtPayload;
  if (!verifiedToken) {
    //throw error
    return;
  }

  // find that user by id
  const user = await findUserById(token.id);

  if (!user) {
    //throw error
    return;
  }

  // create access and refresh token
};
