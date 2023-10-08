import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editComment as editCommentApi } from "../../services/apiComment";
import { toast } from "react-hot-toast";

export function useEditComment() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: editComment } = useMutation({
    mutationFn: editCommentApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, editComment };
}
