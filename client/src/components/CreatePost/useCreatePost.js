import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost as createPostApi } from "../../services/apiPost";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useCreatePost() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["Post", "Comment"],
      });
      navigate(`/posts/${data.post._id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createPost, isLoading };
}
