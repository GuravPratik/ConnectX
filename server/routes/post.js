const express = require("express");
const {
  getPost,
  createPost,
  deletePost,
} = require("../controllers/postController");
const { isLoggedIn } = require("../middlewares/auth");

const router = express.Router();

router.route("/post").get(isLoggedIn, getPost);
router.route("/post").post(isLoggedIn, createPost);
router.route("/post/:postId").delete(isLoggedIn, deletePost);

module.exports = router;
