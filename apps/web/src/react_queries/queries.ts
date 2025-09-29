import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query";
import { api } from "../utils/axiosInstance";
import { UserProfile } from "../types/user";
import { Recipe, Recipes, SavedRecipe } from "../types/recipe";
import { NoteType } from "../types/notes";
import { CommunitiesType } from "../types/community";
//fetch user profile
export const useProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/api/v1/user");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    refetchOnMount: false,
  });
};

// fetch single recipe data
export const useRecipe = (recipeId: string) => {
  return useQuery<Recipe>({
    queryKey: ["recipeData", recipeId],
    queryFn: async () => {
      const response = await api.get(`/api/v1/recipe/${recipeId}`);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    refetchOnMount: false,
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
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    refetchOnMount: false,
  });
};

// fetch notes for a recipe
export const useNotes = (
  recipeId: string,
  queryOptions?: Omit<UseQueryOptions<NoteType, Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["notes", recipeId],
    queryFn: async () => {
      const response = await api.get(`/api/v1/recipe/${recipeId}/note`);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    refetchOnMount: false,
    ...queryOptions,
  });
};

//fetch all saved recipes
export const useSavedRecipes = () => {
  return useQuery<SavedRecipe[]>({
    queryKey: ["savedRecipe"],
    queryFn: async () => {
      const response = await api.get("/api/v1/recipe/savedRecipe");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};

//fetch single community data
export const useCommunity = (communityId: string) => {
  return useQuery({
    queryKey: ["community", communityId],
    queryFn: async () => {
      const response = await api.get(`/api/v1/community/${communityId}`);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};

// fetch all communities
export const useAllCommunities = () => {
  return useQuery<CommunitiesType[]>({
    queryKey: ["communities"],
    queryFn: async () => {
      const response = await api.get("/api/v1/community");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};
