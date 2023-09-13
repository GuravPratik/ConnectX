const express = require("express");
const {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateUserDetails,
} = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/auth");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/updateProfile").patch(isLoggedIn, updateUserDetails);

module.exports = router;
