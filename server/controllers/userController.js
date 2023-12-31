const cloudinary = require("cloudinary").v2;
const User = require("../model/user");
const mailHelper = require("../utils/emailHelper");
const cookieToken = require("../utils/cookieToken");
const crypto = require("crypto");

exports.signUp = async (req, res) => {
  const { userName, fullName, email, password } = req.body;
  // check if the all info is present or not
  if (!userName || !fullName || !email || !password) {
    return res.status(400).json({
      error: "Please provide all fields",
      success: false,
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
        success: false,
      });
    } else if (error.code === 11000 && error.keyPattern.email === 1) {
      res.status(400).json({
        error: "User already exists. Please choose a different email.",
        success: false,
      });
    } else if (error.errors && error.errors.password) {
      res.status(400).json({
        error: error.errors.password.message,
        success: false,
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
      error: "Please provide userName and password",
    });
  }

  try {
    const user = await User.findOne({
      userName: userName.toLowerCase(),
    }).select("+password");
    if (!user) {
      return res.status(403).json({
        error: "User not found ! Please first Sign up",
      });
    }

    const isPasswordMatch = await user.isPasswordMatch(password);
    console.log(isPasswordMatch, password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        error: "Password does not match! Please enter correct password",
        success: false,
      });
    }
    // if password match send success response with user deatils and also set cookies in the cookie
    cookieToken(user, res);
  } catch (error) {
    res.status(500).json({
      error: "Error while login! Please try again after some time",
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

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      error: `You don't have an account Please first create a account`,
    });
  }

  // generating token
  const forgotToken = user.getForgotPasswordToken();
  // saving token in database
  await user.save({ validateBeforeSave: false });

  // creating a url and message
  const url = `http://localhost:5173/password/reset/${forgotToken}`;

  const message = `Copy paste this link in your URL and hit enter \n\n ${url}`;

  try {
    // sending email
    await mailHelper({
      toEmail: user.email,
      subject: "Password Reset email",
      message,
    });
    return res.status(200).json({
      success: true,
      message: "Email is successfully send",
    });
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Error while sending a mail",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // getting token from params
    const token = req.params.token;

    const encryptToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // checking if token is valid or not
    const user = await User.findOne({
      forgotPasswordToken: encryptToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Token is invalid or expired",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Password and confirm password does not match",
      });
    }

    user.password = req.body.password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password is successfully reset ! U can login with new password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

exports.updateUserDetails = async (req, res) => {
  const updateData = {};
  try {
    if (req.body.fullName) {
      updateData.fullName = req.body.fullName;
    }

    if (req.body.bio) {
      updateData.bio = req.body.bio;
    }

    if (req.files) {
      const previousProfilePic = req.user.profilePic.id;
      if (previousProfilePic) {
        await cloudinary.uploader.destroy(previousProfilePic);
      }

      // update the new image

      const newProfilePic = req.files.avatar;

      const result = await cloudinary.uploader.upload(
        newProfilePic.tempFilePath,
        {
          folder: "ConnectX/Users",

          transformation: [
            { width: 250, height: 250, gravity: "auto", crop: "fill" },
          ],
        }
      );

      updateData.profilePic = {
        id: result.public_id,
        imageUrl: result.secure_url,
      };
    }

    // update user
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "User info is updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

exports.updatePassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId).select("+password");
    const isOldPasswordMatch = await user.isPasswordMatch(oldPassword);
    if (!isOldPasswordMatch) {
      return res.status(401).json({
        success: false,
        error: "Please enter correct old Password",
      });
    }
    // update password with new password
    user.password = newPassword;

    await user.save();

    cookieToken(user, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

exports.getLoggedInUserDetails = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
};

exports.follow = async (req, res) => {
  try {
    // get current logged in user
    const userId = req.user.id;
    // get the id of the user to follow
    const { followUserId } = req.body;
    if (!followUserId) {
      return res.status(400).json({
        error: "User id is required to follow user",
        success: false,
      });
    }

    // get username fullName and id of the follow user
    const followUser = await User.findById(followUserId).select(
      "id userName fullName"
    );

    console.log(followUser);

    const followingObj = {
      userId: followUserId,
      userName: followUser.userName,
      fullName: followUser.fullName,
    };

    // update current logged in user following field
    const currentUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { followings: followingObj },
      },
      {
        new: true,
      }
    );

    const followerObj = {
      userId: userId,
      userName: currentUser.userName,
      fullName: currentUser.fullName,
    };

    // update the follow user follwers field
    await User.findByIdAndUpdate(
      followUserId,
      {
        $push: { followers: followerObj },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Follow successfully",
      currentUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

exports.unfollow = async (req, res) => {
  try {
    // get current logged in user
    const userId = req.user.id;
    // get the id of the user to follow
    const { unFollowUserId } = req.body;
    if (!unFollowUserId) {
      return res.status(400).json({
        error: "User id is required to unfollow user",
        success: false,
      });
    }

    // update current logged in user following field
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { followings: { userId: unFollowUserId } },
      },
      {
        new: true,
      }
    );

    // update the unfollow user follwers field
    await User.findByIdAndUpdate(
      unFollowUserId,
      {
        $pull: { followers: { userId: userId } },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "unfollow successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password -email ");

    if (user) {
      res.status(200).json({
        user,
        message: "user fetch successfully",
        success: true,
      });
      return;
    }

    res.status(404).json({
      message: "User not found",
      success: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

exports.searchUser = async (req, res) => {
  // e.g url = http://localhost:3001/api/v1/users?userName=pratik
  try {
    const { userName } = req.query;

    const query = User.find();
    query.where("userName").regex(new RegExp(userName, "i"));
    query.select("id userName fullName profilePic");

    const users = await query.exec();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error while searching user",
      success: false,
    });
  }
};

exports.fetchRandomUsers = async (req, res) => {
  try {
    const randomUsers = await User.aggregate([
      { $sample: { size: 5 } },
      {
        $project: {
          _id: 1,
          userName: 1,
          fullName: 1,
          profilePic: 1,
        },
      },
    ]);

    res.status(200).json({
      message: "User fetch successfully",
      randomUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error fetching random users",
      success: false,
    });
  }
};
