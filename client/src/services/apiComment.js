import axios from "axios";

export async function fetchPostComment(postId) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/${postId}/comments`,
      {
        headers: {
          Token: localStorage.getItem("token") || "",
        },
      }
    );

    return data.comment;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error while fetching comments"
    );
  }
}
