const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const connectToDB = require("./config/db");

const app = express();
connectToDB();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
    status: "success",
  });
});

app.listen(process.env.PORT, (req, res) => {
  console.log("server is up and running http://localhost:" + process.env.PORT);
});
