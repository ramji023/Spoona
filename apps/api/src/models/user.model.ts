import { prisma } from "@repo/database"; // import prisma client instance to run database query
import { removeUndefined } from "../utils/helper.functions"; // helper functions to remove undefined from json data
import { ApiError } from "../utils/customError";

interface UserData {
  username?: string;
  email: string;
  password: string;
}

// write model function to create new user in user table
export const createNewUser = async (userData: UserData) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: userData.username ?? userData.email.split("@")[0],
        email: userData.email,
        password: userData.password,
      },
    });

    return user;
  } catch (err) {
    throw new ApiError("Something went wrong while creating new user", 404);
  }
};

// model function to find the user in User table
export const findUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    return user;
  } catch (err) {
    throw new ApiError("Something went wrong while finding existing user", 404);
  }
};

// model function to find the user personal data from user table
export const findUserById = async (userData: { id: string }) => {
  try {
    // console.log("userData : ", userData);
    const user = await prisma.user.findUnique({
      where: { id: userData.id },
      select: {
        id: true,
        username: true,
        email: true,
        profileImage: true,
        bio: true,
        recipes: true,
      },
    });
    return user;
  } catch (err) {
    throw new ApiError(
      "Something went wrong while fetching user profile data",
      404
    );
  }
};

interface UserDataParams {
  userId: string;
  data: Partial<{
    username?: string;
    bio?: string;
    profileImage?: string;
  }>;
}

// model function to update the user profile data
export const updateUser = async (userData: UserDataParams) => {
  try {
    // console.log(userData);
    console.log("updatedData : ", userData);
    const updatedUser = await prisma.user.update({
      where: { id: userData.userId },
      data: userData.data,
    });
    // console.log("result : ", updatedUser);
    return updatedUser;
  } catch (err) {
    console.log(err);
    throw new ApiError("Something went wrong while updating user data", 404);
  }
};

// model function to get popular creators data
export const popularCreators = async () => {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        profileImage: true,
      },
    });
  } catch (err) {
    throw new ApiError(
      "Something went wrong while fetching popular creators data",
      404
    );
  }
};
