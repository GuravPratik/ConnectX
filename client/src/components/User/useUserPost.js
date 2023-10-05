import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchUserPosts } from "../../services/apiUser";

export function useUserPost() {
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const { isLoading, data, error } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => fetchUserPosts(userId, token),
    retry: false,
  });

  return { isLoading, error, data };
}
