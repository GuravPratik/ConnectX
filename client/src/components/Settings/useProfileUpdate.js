import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateUserDetails as updateUserDetailsApi } from "../../services/apiAuth";
export function useProfileUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updateUserProfile, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserDetailsApi,
    onSuccess: (data) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["currentUser"], data.updatedUser);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateUserProfile, isUpdating };
}
