import { create } from "zustand";

type AuthState = {
  token: string | null;
  username: string | null;
  email: string | null;
  bio: string | null;
  profileImage: string | null;
};
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  username: null,
  email: null,
  bio: null,
  profileImage: null,

  login: () => {},
  logout: () => {},
}));
