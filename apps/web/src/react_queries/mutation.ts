import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import { useSuccessMsgStore } from "../stores/successMsgStore";
import { useFailureMsgStore } from "../stores/failureMsgStore";
import { api } from "../utils/axiosInstance";
import { AxiosError } from "axios";

// write follower mutation to follow or unfollow to creators
export const useFollowMutation = (creatorId: string | undefined) => {
  const queryClient = useQueryClient();
  const setSuccessMsg = useSuccessMsgStore((s) => s.setSuccessMsg);
  const setFailureMsg = useFailureMsgStore((s) => s.setFailureMsg);

  return useMutation({
    mutationFn: async (followingId: string) => {
      const response = await api.post("/api/v1/subscriber/follow", {
        followingId,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("response data:", data);
      setSuccessMsg(data.msg || "Success!");
      queryClient.invalidateQueries({ queryKey: ["creator", creatorId] });
      queryClient.invalidateQueries({
        queryKey: [useAuthStore.getState().id],
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err: Error | any) => {
      if (err instanceof AxiosError) {
        if (err.response) {
          setFailureMsg(
            err.response.data?.message ||
              "Something went wrong. Please try again."
          );
        } else if (err.request) {
          setFailureMsg("No response from server. Please try again.");
        } else {
          console.log(err.message);
          setFailureMsg(err.message || "An unexpected error occurred");
        }
      } else {
        setFailureMsg("An unexpected error occurred");
      }
    },
  });
};
