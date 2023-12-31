const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
  const token = req.cookies.Token || req.header("Token");
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is not present please logged in to access the page",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Please authenticate using a valid token",
    });
  }
};
