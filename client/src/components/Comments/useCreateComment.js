import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment as createCommentApi } from "../../services/apiComment";
import { toast } from "react-hot-toast";

export function useCreateComment() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: addComment } = useMutation({
    mutationFn: createCommentApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addComment, isLoading };
}
