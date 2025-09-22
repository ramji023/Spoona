import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setToken: (token: string | null) => void;
};
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setToken: (token: string | null) => set({ token }),
}));
