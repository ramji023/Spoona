import { Recipes } from "./recipe";

export interface CommunitiesType {
  id: string;
  name: string;
  coverImage: string;
  CommunityMembers: {
    user: {
      id: string;
      profileImage: string | null;
    };
  }[];
}

export interface Community {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  CommunityMembers: {
    user: {
      id: string;
      profileImage: string | null;
    };
  }[];
  CommunityRecipe: {
    recipe: Recipes;
  }[];
}
