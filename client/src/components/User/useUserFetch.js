import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchUserDetails } from "../../services/apiUser";

export function useUserFetch() {
  const { userId } = useParams();

  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserDetails(userId),
    retry: false,
  });

  return { isLoading, error, user };
}
