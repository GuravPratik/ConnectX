import axios from "axios";

export async function fetchAllPosts() {
  try {
    const { data } = await axios.get(`http://localhost:3001/api/v1/posts`, {
      headers: {
        Token: localStorage.getItem("token") || "",
      },
    });

    return data.posts;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error while fetching posts"
    );
  }
}

export async function fetchPostUsingId(postId) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/post/${postId}`,
      {
        headers: {
          Token: localStorage.getItem("token") || "",
        },
      }
    );

    return data.post;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error while fetching posts"
    );
  }
}
