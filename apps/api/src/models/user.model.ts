import { prisma, User } from "@repo/database";
import { removeUndefined } from "../utils/helper.functions";

interface UserData {
  username?: string;
  email: string;
  password: string;
}

// create new user
export const createNewUser = async (userData: UserData) => {
  const user = await prisma.user.create({
    data: {
      username: userData.username ?? userData.email.split("@")[0],
      email: userData.email,
      password: userData.password,
    },
  });

  return user;
};

// find unique user
export const findUser = async (userData: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  return user;
};

// update user profile data
export const updateUser = async (userData: {
  userId: string;
  bio?: string;
  profileImage?: string;
  username?: string;
}) => {
  console.log(userData);
  const updateData = removeUndefined({
    username: userData.username,
    bio: userData.bio,
    profileImage: userData.profileImage,
  });

  console.log("updatedData : ", updateData);
  const updatedUser = await prisma.user.update({
    where: { id: userData.userId },
    data: updateData,
  });
  console.log("result : ", updatedUser);
  return updatedUser;
};

// find unique user
export const findUserById = async (userData: { id: string }) => {
  // console.log("userData : ", userData);
  const user = await prisma.user.findUnique({
    where: { id: userData.id },
    select:{
      id:true,
      username:true,
      email:true,
      profileImage:true,
      bio:true,
      recipes:true,  
    }
  });
  return user;
};
