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
