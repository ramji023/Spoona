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
};

export type PopularCreator = {
  id: string;
  username: string;
  profileImage: string;
};
