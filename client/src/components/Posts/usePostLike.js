import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost as likePostApi } from "../../services/apiPost";
import toast from "react-hot-toast";

export function usePostLike(postId) {
  const queryClient = useQueryClient();
  const { isLoading, mutate: likePost } = useMutation({
    mutationFn: likePostApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries(["Post"], postId);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { likePost, isLoading };
}
