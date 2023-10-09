import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unFollowUser as unFollowUserApi } from "../../services/apiUser";
import toast from "react-hot-toast";

export function useUnfollow() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: unFollowUser } = useMutation({
    mutationFn: unFollowUserApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, unFollowUser };
}
