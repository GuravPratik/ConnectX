exports.getPost = (req, res) => {
  console.log(req.user);
  res.json({
    message: "Post get route",
  });
};
