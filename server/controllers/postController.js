const Post = require("../model/post");
const User = require("../model/user");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

exports.getPost = async (req, res) => {
  console.log(req.user.id);
  try {
    const posts = await Post.find();
    res.json({
      message: "Post get route",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    // get needed user info to create a post
    const user = await User.findById(req.user.id).select("id");

    const { caption } = req.body;

    if (!req.files) {
      return res.status(400).json({
        message: "Please upload image",
        success: false,
      });
    }

    const file = req.files.postImage;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "ConnectX/Posts",
    });

    const imageInfo = {
      id: result?.public_id,
      secureUrl: result?.secure_url,
    };

    let postData = {};

    if (caption) {
      postData = {
        userId: user.id,
        caption,
        imageInfo,
      };
    } else {
      postData = {
        userId: user.id,
        imageInfo,
      };
    }

    const post = await Post.create(postData);

    res.json({
      message: "post is successfully created",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    // get the postid
    const { postId } = req.params;

    // find post using postid
    const post = await Post.findById(postId);

    // if post not found send response like post not found
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    // get publicId of post and delete the post from cloudinary
    const { id } = post.imageInfo;
    await cloudinary.uploader.destroy(id);

    // delete the post from database
    await Post.findByIdAndDelete(postId);
    res.status(200).json({
      message: "Post is deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
