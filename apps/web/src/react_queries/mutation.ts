import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import { useSuccessMsgStore } from "../stores/successMsgStore";
import { useFailureMsgStore } from "../stores/failureMsgStore";
import { api } from "../utils/axiosInstance";

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
    },
    onError: (err: Error | any) => {
      console.error("Follow operation failed:", err);
      if (err.request) {
        setFailureMsg("Network error: Cannot connect to server");
      } else if (err.response) {
        setFailureMsg(err.response.data?.message || "Operation failed");
      } else {
        setFailureMsg("Something went wrong. Try again");
      }
    },
  });
};
