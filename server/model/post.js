const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
    maxLength: [280, "Caption should not be greater than 280 characters"],
  },
  imageInfo: {
    id: {
      type: String,
      required: true,
    },
    secureUrl: {
      type: String,
      required: true,
    },
  },
  likesId: [
    {
      userId: { type: mongoose.Schema.ObjectId, ref: "User" },
      userName: String,
      fullName: String,
    },
  ],
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Post", postSchema);
