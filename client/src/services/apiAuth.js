import axios from "axios";

export async function signUp({ userName, fullName, email, password }) {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/v1/signup",
      {
        userName,
        fullName,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.error);
  }
}

export async function login({ userName, password }) {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/v1/login",
      {
        userName,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export async function getCurrentUser() {
  try {
    const { data } = await axios.get("http://localhost:3001/api/v1/user", {
      headers: {
        Token: localStorage.getItem("token") || "",
      },
    });
    return data.user;
  } catch (error) {
    throw new Error(error.response.data.message || "Please login to access...");
  }
}

export async function logout() {
  try {
    const { data } = await axios.get("http://localhost:3001/api/v1/logout");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function updateUserDetails({ avatar, bio, fullName }) {
  try {
    const updateData = {};

    if (avatar) {
      updateData.avatar = avatar;
    }
    if (bio) {
      updateData.bio = bio;
    }

    if (fullName) {
      updateData.fullName = fullName;
    }

    const { data } = await axios.patch(
      "http://localhost:3001/api/v1/updateProfile",
      {
        avatar: updateData.avatar,
        bio: updateData.bio,
        fullName: updateData.fullName,
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
    throw new Error(
      error.response.data.message || "Error while updating profile"
    );
  }
}

export async function updateLoggedUserPassword({ oldPassword, newPassword }) {
  try {
    const { data } = await axios.patch(
      `http://localhost:3001/api/v1/password/update`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Token: localStorage.getItem("token") || "",
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.error ||
        error.response.data.message ||
        "Error while updating password"
    );
  }
}
