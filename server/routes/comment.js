const express = require("express");

const { isLoggedIn } = require("../middlewares/auth");
const {
  createComments,
  fetchComments,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");

const router = express.Router();

router.route("/:postId/comments").get(isLoggedIn, fetchComments);
router.route("/:postId/comments").post(isLoggedIn, createComments);
router.route("/comments/:commentId").patch(isLoggedIn, updateComment);
router.route("/comments/:commentId").delete(isLoggedIn, deleteComment);

module.exports = router;
