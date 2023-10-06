import { useQuery } from "@tanstack/react-query";
import { fetchPostComment } from "../../services/apiComment";

export function useCommentById(postId) {
  const {
    isLoading,
    data: comments,
    isError,
    error,
  } = useQuery({
    queryKey: ["Comment", postId],
    queryFn: () => fetchPostComment(postId),
  });

  return { isLoading, comments, isError, error };
}
