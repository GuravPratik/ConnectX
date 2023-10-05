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
    console.log(error);
    throw new Error(error.response.data.error);
  }
}

export async function getCurrentUser(token) {
  try {
    const { data } = await axios.get("http://localhost:3001/api/v1/user", {
      headers: {
        Token: token,
      },
    });
    return data.user;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
