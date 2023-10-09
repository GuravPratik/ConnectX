import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;
export async function fetchUserDetails(userId) {
  try {
    const { data } = await axios.get(`${serverUrl}/user/details/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.user;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function fetchUserPosts(userId, token) {
  try {
    const { data } = await axios.get(`${serverUrl}/user/posts/${userId}`, {
      headers: {
        Token: token,
      },
    });
    return data.posts;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function getRandomUsers() {
  try {
    const { data } = await axios.get(`${serverUrl}/user/getRandom`);

    return data.randomUsers;
  } catch (error) {
    throw new Error(error.response.data.error || "Error fetching Random users");
  }
}

export async function followUser({ followUserId }) {
  try {
    const { data } = await axios.patch(
      `${serverUrl}/follow`,
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
      `${serverUrl}/unfollow`,
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
