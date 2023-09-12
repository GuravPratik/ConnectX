const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const User = require("../model/user");

const cookieToken = require("../utils/cookieToken");

exports.signUp = async (req, res) => {
  const { userName, fullName, email, password } = req.body;

  // check if the all info is present or not
  if (!userName || !fullName || !email || !password) {
    return res.json({
      message: "Please provide all fields",
    });
  }

  try {
    // uploading image to cloudinary
    let result;
    if (req.files) {
      // getting the file details
      const file = req.files.avatar;
      result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "ConnectX/Users",
        width: 150,
        crop: "scale",
      });
    }

    const profilePic = {
      id: result?.public_id,
      imageUrl: result?.secure_url,
    };
    // save user into database
    const createdUser = await User.create({
      userName,
      fullName,
      email,
      password,
      profilePic,
    });
    res.json({
      message: "user is successfully created",
      success: true,
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
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;

  if (!(userName && password)) {
    return res.status(400).json({
      success: false,
      message: "Please provide userName and password",
    });
  }

  try {
    const user = await User.findOne({ userName }).select("+password");
    if (!user) {
      return res.status(403).json({
        message: "User not found ! Please first Sign up",
      });
    }
    const isPasswordMatch = await user.isPasswordMatch(password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        message: "Password does not match! Please enter correct password",
        success: false,
      });
    }
    // if password match send success response with user deatils and also set cookies in the cookie
    cookieToken(user, res);
  } catch (error) {
    res.status(500).json({
      message: "Error while login! Please try again after some time",
      success: false,
    });
  }
};

exports.logout = async (req, res) => {
  res
    .cookie("Token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logout successfully",
    });
};
