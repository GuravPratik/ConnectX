import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLoggedUserPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function usePasswordUpdate() {
  const queryClient = useQueryClient();
  const {
    mutate: updateUserPassword,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: updateLoggedUserPassword,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(["currentUser"], data.user);
      toast.success("Password Updated Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateUserPassword, isLoading, isError, error };
}
