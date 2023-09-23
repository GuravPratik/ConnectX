const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { Schema, model } = mongoose;

const followerSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  fullName: String,
  userName: String,
});

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Please use unique username"],
    maxLength: [10, "username should be less than 10 character"],
    lowercase: true,
  },
  fullName: {
    type: String,
    required: [true, "Please provide your name"],
    maxLength: [30, "Fullname should be less than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    validate: [validator.isEmail, "Please enter email in correct format"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [8, "Password should be 8 or more character"],
    select: false,
  },
  profilePic: {
    id: {
      type: String,
    },
    imageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1694346301/ConnectX/2048px-Windows_10_Default_Profile_Picture.svg_osfygk.png",
    },
  },
  bio: String,
  followings: [followerSchema],
  followers: [followerSchema],
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// save the password in hash before saving the user

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// method is created to compare password
userSchema.methods.isPasswordMatch = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.getjwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

userSchema.methods.getForgotPasswordToken = function () {
  const forgotToken = crypto.randomBytes(20).toString("hex");

  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

  return forgotToken;
};

module.exports = model("User", userSchema);
