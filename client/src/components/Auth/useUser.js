import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 2 * 60 * 1000,
  });

  return {
    isLoading,
    data,
    isError,
    error,
  };
}
