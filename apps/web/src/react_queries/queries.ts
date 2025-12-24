import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query";
import { api } from "../utils/axiosInstance";
import { PopularCreator, UserProfile } from "../types/user";
import { Recipe, Recipes, SavedRecipe } from "../types/recipe";
import { NoteType } from "../types/notes";
import { CommunitiesType, Community } from "../types/community";
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

// react query to fetch single recipe data
export const useRecipe = (recipeId?: string) => {
  return useQuery<Recipe>({
    queryKey: ["recipeData", recipeId],
    queryFn: async () => {
      const response = await api.get(`/api/v1/recipe/${recipeId}`);
      return response.data.data;
    },
    enabled: !!recipeId,
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    refetchOnMount: false,
  });
};

// react query to fetch  all the recipes
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

// react query to fetch notes for a specific recipe
export const useNotes = (
  recipeId?: string,
  queryOptions?: Omit<UseQueryOptions<NoteType, Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["notes", recipeId],
    queryFn: async () => {
      const response = await api.get(`/api/v1/recipe/${recipeId}/note`);
      return response.data.data;
    },
    enabled: !!recipeId,
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    refetchOnMount: false,
    ...queryOptions,
  });
};

//react query to fetch all saved recipes
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

//react query to fetch single community data
export const useCommunity = (communityId?: string) => {
  return useQuery<Community>({
    queryKey: ["community", communityId],
    queryFn: async () => {
      const response = await api.get(`/api/v1/community/${communityId}`);
      return response.data.data;
    },
    enabled: !!communityId,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};

// react-query to fetch all the communities data
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

// react-query to fetch popular creators
export const usePopularCreators = () => {
  return useQuery<PopularCreator[]>({
    queryKey: ["Popular_creator"],
    queryFn: async () => {
      const response = await api.get("/api/v1/user/creators");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};
