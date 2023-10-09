import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function fetchPostComment(postId) {
  try {
    const { data } = await axios.get(`${serverUrl}/${postId}/comments`, {
      headers: {
        Token: localStorage.getItem("token") || "",
      },
    });

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
      `${serverUrl}/${postId}/comments`,
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
      `${serverUrl}/comments/${commentId}`,
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
