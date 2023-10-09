import { useMutation, useQueryClient } from "@tanstack/react-query";
import { disLikePost as disLikePostApi } from "../../services/apiPost";
import toast from "react-hot-toast";

export function usePostDislike(postId) {
  const queryClient = useQueryClient();
  const { isLoading, mutate: disLikePost } = useMutation({
    mutationFn: disLikePostApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ stale: true });
      queryClient.invalidateQueries(["Post"], postId);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { disLikePost, isLoading };
}
