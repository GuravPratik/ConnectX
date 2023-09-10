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
    maxLength: [258, "Caption should not be greater than 258 characters"],
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
  LikeCount: {
    type: Number,
    default: 0,
  },
  CommentCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Post", postSchema);
