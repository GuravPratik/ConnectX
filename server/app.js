const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");

// routes
const user = require("./routes/user");
const post = require("./routes/post");

// App
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

// regular middleware

app.use(cors(corsOptions));
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

// routes middleware
app.use("/api/v1", user);
app.use("/api/v1", post);

module.exports = app;
