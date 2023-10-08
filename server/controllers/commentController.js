const Post = require("../model/post");
const User = require("../model/user");
const Comment = require("../model/comment");

exports.createComments = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const { content } = req.body;

    const comment = await Comment.create({
      content,
      userId,
      postId,
    });

    res.status(200).json({
      message: "comment is added",
      success: true,
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating comment",
      success: false,
    });
  }
};

exports.fetchComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comment = await Comment.find({
      postId,
    }).populate("userId", "id userName fullName profilePic");

    res.status(200).json({
      message: "comment is fetch",
      success: true,
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while fetching comments",
      success: false,
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    if (!req.params.commentId) {
      return res.status(400).json({
        message: "Invalid input data",
        success: true,
      });
    }
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        message: "please add some comment",
        success: false,
      });
    }

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
        success: false,
      });
    }
    const matchUser = await comment.matchUser(req.user.id);
    if (!matchUser) {
      return res.status(400).json({
        message: "You can only update your comment",
        success: false,
      });
    }

    await Comment.findByIdAndUpdate(req.params.commentId, {
      content,
    });

    res.status(200).json({
      message: "Comment is updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while updating comments",
      success: false,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    if (!req.params.commentId) {
      return res.status(400).json({
        message: "Invalid input data",
        success: true,
      });
    }

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
        success: false,
      });
    }
    const matchUser = await comment.matchUser(req.user.id);
    if (!matchUser) {
      return res.status(400).json({
        message: "You can only delete your comment",
        success: false,
      });
    }
    await Comment.findByIdAndDelete(req.params.commentId);

    res.status(200).json({
      message: "Comment is deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while deleting comments",
      success: false,
    });
  }
};
