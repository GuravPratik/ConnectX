import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostUsingId as updatePostApi } from "../../services/apiPost";
import toast from "react-hot-toast";

export function usePostEdit(postId) {
  const queryClient = useQueryClient();
  const { mutate: updatePost, isLoading: isUpdating } = useMutation({
    mutationFn: updatePostApi,
    onSuccess: (data) => {
      toast.success(data.message);
      // queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries(["Post"], postId);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updatePost, isUpdating };
}
