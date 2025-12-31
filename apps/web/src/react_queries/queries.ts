import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query";
import { api } from "../utils/axiosInstance";
import { CreatorProfile, PopularCreator, UserDataType, UserProfile } from "../types/user";
import { Recipe, Recipes, SavedRecipeType } from "../types/recipe";
import { NoteType } from "../types/notes";
import { CommunitiesType, Community } from "../types/community";
import { PlannerData } from "../types/planner";
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
  return useQuery<SavedRecipeType[]>({
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
    refetchOnMount: true,
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

// react-query to fetch complete data for a given creator Id
export const useCreatorData = (creatorId: string | undefined) => {
  return useQuery<CreatorProfile>({
    queryKey: ["creator", creatorId],
    queryFn: async () => {
      const response = await api.get(`/api/v1/user/creators/${creatorId}`);
      return response.data.data;
    },
    staleTime:1000*60*5,
    refetchOnMount:false,
    enabled:!!creatorId
  });
};

// react-query to fetch user all saved and liked recipe data
export const useUserRecipeData = (id: string | null, options = {}) => {
  return useQuery<UserDataType>({
    queryKey: [id],
    queryFn: async () => {
      const response = await api.get("/api/v1/recipe/recipeData");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 20,
    refetchOnMount: false,
    enabled: !!id,
    ...options,
  });
};

// react-query to fetch all the planners of authenticate user
export const useFetchPlanners = (id: string | null) => {
  return useQuery<PlannerData[]>({
    queryKey: ["planner"],
    queryFn: async () => {
      const response = await api.get("/api/v1/planner");
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
    refetchOnMount: false,
  });
};
