import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signUp as signUpApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
export function useSignup() {
  const navigate = useNavigate();
  const {
    mutate: signUp,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        `Congratulations! Your account has been successfully created. Please proceed to log in to access the application.`
      );
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signUp, isError, isLoading };
}
