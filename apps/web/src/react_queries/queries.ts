import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/axiosInstance";
import { UserProfile } from "../types/user";

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
  return useQuery({
    queryKey: ["recipeData"],
    queryFn: async () => {
      const response = await api.get(`/api/v1/recipe/${recipeId}`);
      return response.data;
    },
  });
};
