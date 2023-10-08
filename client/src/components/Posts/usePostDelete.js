import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostUsingId as deletePostApi } from "../../services/apiPost";
import toast from "react-hot-toast";

export function usePostDelete() {
  const queryClient = useQueryClient();
  const { mutate: deletPost, isLoading } = useMutation({
    mutationFn: (postId) => deletePostApi(postId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["user", "userPosts"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deletPost, isLoading };
}
