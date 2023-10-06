import { useQuery } from "@tanstack/react-query";
import { fetchPostUsingId } from "../../services/apiPost";

export function usePostById(postId) {
  const {
    isLoading,
    data: postData,
    isError,
    error,
  } = useQuery({
    queryKey: ["Post", postId],
    queryFn: () => fetchPostUsingId(postId),
  });

  return { isLoading, postData, isError, error };
}
