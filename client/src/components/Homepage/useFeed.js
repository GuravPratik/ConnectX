import { useQuery } from "@tanstack/react-query";
import { fetchAllPosts } from "../../services/apiPost";

export function useFeed() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["Posts"],
    queryFn: fetchAllPosts,
    staleTime: 1000,
  });

  return { isLoading, data, isError, error };
}
