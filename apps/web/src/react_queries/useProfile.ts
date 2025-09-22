import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/axiosInstance";
import { UserProfile } from "../types/user";

export const useProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/api/v1/user");
      return response.data;
    },
  });
};
