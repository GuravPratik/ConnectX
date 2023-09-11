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
  imageUrl: {
    id: {
      id: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
        required: true,
      },
    },
  },
  likesId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
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
