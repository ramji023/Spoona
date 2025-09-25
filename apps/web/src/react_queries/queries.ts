import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/axiosInstance";
import { UserProfile } from "../types/user";
import { Recipe, Recipes } from "../types/recipe";
//fetch user profile
export const useProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/api/v1/user");
      return response.data;
    },
  });
};

// fetch single recipe data
export const useRecipe = (recipeId: string) => {
  return useQuery<Recipe>({
    queryKey: ["recipeData"],
    queryFn: async () => {
      const response = await api.get(`/api/v1/recipe/${recipeId}`);
      return response.data.data;
    }
  });
};

// fetch all the recipes
export const useRecipes = () => {
  return useQuery<Recipes[]>({
    queryKey: ["recipes"],
    queryFn: async () => {
      const response = await api.get("/api/v1/recipe");
      return response.data.data;
    },
  });
};
