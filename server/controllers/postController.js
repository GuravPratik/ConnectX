const Post = require("../model/post");
const User = require("../model/user");
const cloudinary = require("cloudinary").v2;

exports.getPost = async (req, res) => {
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

exports.updatePost = async (req, res) => {
  try {
    if (!req.body.caption) {
      return res.status(400).json({
        message: "Please enter caption to update the post",
        success: false,
      });
    }

    const post = await Post.findById(req.params.postId);

    const matchUser = await post.matchUser(req.user.id);

    if (!matchUser) {
      return res.status(401).json({
        message: `You don't have an authority to update the post!`,
        success: false,
      });
    }

    post.caption = req.body.caption;
    post.updatedAt = Date.now();
    const updatedPost = await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      success: true,
      updatedPost,
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
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    const userMatch = await post.matchUser(req.user.id);

    if (!userMatch) {
      return res.status(401).json({
        message: `You don't have an authority to delete the post!`,
        success: false,
      });
    }

    const { id } = post.imageInfo;
    await cloudinary.uploader.destroy(id);

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

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Post found",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.getUsersAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      userId: req.user.id,
    });

    res.status(200).json({
      message: "Users all Posts fetch",
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
