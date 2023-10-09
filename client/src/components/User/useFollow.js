import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser as followUserApi } from "../../services/apiUser";
import toast from "react-hot-toast";

export function useFollow() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: followUser } = useMutation({
    mutationFn: followUserApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, followUser };
}
