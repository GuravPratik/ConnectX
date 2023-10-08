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

export async function createPost({ postImage, caption }) {
  try {
    const { data } = await axios.post(
      `http://localhost:3001/api/v1/post`,
      {
        postImage,
        caption,
      },
      {
        headers: {
          Token: localStorage.getItem("token") || "",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error while creating post");
  }
}

export async function updatePostUsingId({ postId, caption }) {
  try {
    const { data } = await axios.patch(
      `http://localhost:3001/api/v1/post/${postId}`,
      {
        caption: caption,
      },
      {
        headers: {
          Token: localStorage.getItem("token") || "",
        },
      }
    );

    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error while updating post");
  }
}

export async function deletePostUsingId(postId) {
  try {
    const { data } = await axios.delete(
      `http://localhost:3001/api/v1/post/${postId}`,
      {
        headers: {
          Token: localStorage.getItem("token") || "",
        },
      }
    );

    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error while deleting post");
  }
}
