const express = require("express");
const { getPost } = require("../controllers/postController");
const { isLoggedIn } = require("../middlewares/auth");

const router = express.Router();

router.route("/getPost").get(isLoggedIn, getPost);

module.exports = router;
