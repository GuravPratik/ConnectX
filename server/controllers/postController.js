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

    // get post id
    const post = await Post.findById(req.params.postId);
    // get user id
    // fetch post and check if the user is the owner of the post or not

    const matchUser = await post.matchUser(req.user.id);

    if (!matchUser) {
      return res.status(401).json({
        message: `You don't have an authority to update the post!`,
        success: false,
      });
    }
    // update the post captions and change the updated at

    post.caption = req.body.caption;
    post.updatedAt = Date.now();
    const updatedPost = await post.save();

    // send res

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
    // check if user who trying to delete the post is match or not
    const userMatch = await post.matchUser(req.user.id);

    if (!userMatch) {
      return res.status(401).json({
        message: `You don't have an authority to delete the post!`,
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
