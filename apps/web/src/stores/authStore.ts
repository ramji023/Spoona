import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  id: string | null;
  savedRecipeData: string[] | null; // store all the saved recipe data
  followingData: string[] | null; // store all the following data
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setToken: (token: string | null, id: string | null) => void;
  setSavedRecipe: (savedRecipeData: string[]) => void;
  setFollowingData: (followingData: string[]) => void;
};
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  id: null,
  savedRecipeData: null,
  followingData: null,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setToken: (token: string | null, id: string | null) => set({ token, id }),
  setSavedRecipe: (savedRecipeData) => set({ savedRecipeData }),
  setFollowingData: (followingData) => set({ followingData }),
}));
