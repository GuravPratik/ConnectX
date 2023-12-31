import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function signUp({ userName, fullName, email, password }) {
  try {
    const { data } = await axios.post(
      `${serverUrl}/signup`,
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

    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
}

export async function login({ userName, password }) {
  try {
    const { data } = await axios.post(
      `${serverUrl}/login`,
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
    const { data } = await axios.get(`${serverUrl}/user`, {
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
    const { data } = await axios.get(`${serverUrl}/logout`);
    return data;
  } catch (error) {
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
      `${serverUrl}/updateProfile`,
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
      `${serverUrl}/password/update`,
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

export async function getResetPasswordLink({ email }) {
  try {
    const { data } = await axios.post(`${serverUrl}/forgotPassword`, {
      email,
    });

    return data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error while sending email");
  }
}

export async function resetPasswordUsingEmail({
  token,
  password,
  confirmPassword,
}) {
  try {
    const { data } = await axios.post(`${serverUrl}/password/reset/${token}`, {
      password,
      confirmPassword,
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response.data.error || "Error while reseting password"
    );
  }
}
