const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");

const connectToDB = require("./config/db");
const User = require("./model/user");

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
connectToDB();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
    status: "success",
  });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log({ users });

    res.status(200).json({
      users,
      message: "users are fetch",
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/createUser", async (req, res) => {
  const { userName, fullName, email, password } = req.body;
  try {
    const createdUser = await User.create({
      userName,
      fullName,
      email,
      password,
    });
    res.json({
      message: "user is successfully stored",
      status: "success",
      createdUser,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.userName === 1) {
      res.status(400).json({
        error: "Username already exists. Please choose a different username.",
      });
    } else if (error.code === 11000 && error.keyPattern.email === 1) {
      res.status(400).json({
        error: "User already exists. Please choose a different email.",
      });
    } else if (error.errors && error.errors.password) {
      res.status(500).json({
        error: error.errors.password.message,
      });
    } else {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the user." });
    }
  }
});

app.listen(process.env.PORT, (req, res) => {
  console.log("server is up and running http://localhost:" + process.env.PORT);
});
