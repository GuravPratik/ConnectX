import { useQuery } from "@tanstack/react-query";
import { getRandomUsers } from "../../services/apiUser";

export function useRandomUser() {
  const {
    isLoading,
    data: randomUsers,
    isError,
    error,
  } = useQuery({
    queryKey: ["RandomUsers"],
    queryFn: getRandomUsers,
    staleTime: 300000,
  });

  return { isLoading, randomUsers, isError, error };
}
