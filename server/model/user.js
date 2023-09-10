const mongoose = require("mongoose");
const validator = require("validator");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Please use unique username"],
    maxLength: [10, "username should be less than 10 character"],
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
  },
  displayPicture: {
    id: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://res.cloudinary.com/diqgskxvi/image/upload/v1694346301/ConnectX/2048px-Windows_10_Default_Profile_Picture.svg_osfygk.png",
    },
  },

  following: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema);
