import { useQuery } from "@tanstack/react-query";
import { fetchAllPosts } from "../../services/apiPost";

export function useFeed() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["Posts"],
    queryFn: fetchAllPosts,
  });

  return { isLoading, data, isError, error };
}
