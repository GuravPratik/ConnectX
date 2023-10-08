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

export async function addComment({ postId, content }) {
  try {
    const { data } = await axios.post(
      `http://localhost:3001/api/v1/${postId}/comments`,
      {
        content,
      },
      {
        headers: {
          Token: localStorage.getItem("token") || "",
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error while adding comment"
    );
  }
}

export async function editComment({ commentId, content }) {
  try {
    const { data } = await axios.patch(
      `http://localhost:3001/api/v1/comments/${commentId}`,
      {
        content,
      },
      {
        headers: {
          Token: localStorage.getItem("token") || "",
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error while updating comment"
    );
  }
}
