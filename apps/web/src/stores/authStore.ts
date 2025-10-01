import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  id: string | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setToken: (token: string | null, id: string | null) => void;
};
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  id: null,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setToken: (token: string | null, id: string | null) => set({ token, id }),
}));
