import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.removeQueries();
      toast.success(`Logout successfully`);
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Their is error while logout");
    },
  });

  return { logout, isLoading };
}
