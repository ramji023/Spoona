import { Recipes } from "./recipe";
export type User = {
  email: string;
  password: string;
};

export type UserProfile = {
  id: string;
  email: string;
  username: string;
  bio?: string;
  profileImage?: string;
  recipes: Recipes[];
  _count: {
    Followers: number;
    Followings: number;
  };
};

export type PopularCreator = {
  id: string;
  username: string;
  profileImage: string;
  bio: string;
  _count: {
    Followers: number;
    Followings: number;
  };
};

export type CreatorProfile = {
  id: string;
  username: string;
  bio: string;
  profileImage: string;
  recipes: Recipes[];
  _count: {
    Followers: number;
    Followings: number;
  };
};


export type UserDataType ={
  savedRecipes:string[];
  followingData:string[]
}