const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const User = require("../model/user");

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
};
