import axios from "axios";

export async function fetchUserDetails(userId) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/user/details/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.user;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function fetchUserPosts(userId, token) {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/user/posts/${userId}`,
      {
        headers: {
          Token: token,
        },
      }
    );
    return data.posts;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function getRandomUsers() {
  try {
    const { data } = await axios.get(
      "http://localhost:3001/api/v1/user/getRandom"
    );

    return data.randomUsers;
  } catch (error) {
    throw new Error(error.response.data.error || "Error fetching Random users");
  }
}

export async function followUser({ followUserId }) {
  try {
    const { data } = await axios.patch(
      `http://localhost:3001/api/v1/follow`,
      {
        followUserId,
      },
      {
        headers: {
          Token: localStorage.getItem("token") || "",
        },
      }
    );

    return data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error while following user");
  }
}
export async function unFollowUser({ unFollowUserId }) {
  try {
    const { data } = await axios.patch(
      `http://localhost:3001/api/v1/unfollow`,
      {
        unFollowUserId,
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
      error.response.data.error || "Error while unfollowing user"
    );
  }
}
