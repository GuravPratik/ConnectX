const express = require("express");
const {
  getPost,
  createPost,
  deletePost,
  updatePost,
  getSinglePost,
  getUsersAllPosts,
} = require("../controllers/postController");
const { isLoggedIn } = require("../middlewares/auth");

const router = express.Router();

router.route("/posts").get(isLoggedIn, getPost);
router.route("/post/:postId").get(isLoggedIn, getSinglePost);
router.route("/user/posts").get(isLoggedIn, getUsersAllPosts);
router.route("/post").post(isLoggedIn, createPost);
router.route("/post/:postId").patch(isLoggedIn, updatePost);
router.route("/post/:postId").delete(isLoggedIn, deletePost);

module.exports = router;
