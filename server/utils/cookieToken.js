function cookieToken(user, res) {
  const token = user.getjwtToken();

  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  user.password = undefined;

  res.status(200).cookie("Token", token, option).json({
    message: "User is successfully login",
    success: true,
    user,
    token,
  });
}

module.exports = cookieToken;
