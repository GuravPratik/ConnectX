const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: true,
  },
  content: {
    type: String,
    requied: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Comment", commentSchema);
