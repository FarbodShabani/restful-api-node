const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const { v4 : uuidv4 } = require('uuid');

const app = express();

const feedRouters = require("./router/feed");
const authRouters = require("./router/auth");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage, fileFilter}).single("image"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, delete"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed/", feedRouters);
app.use("/auth/", authRouters);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data || [];
    res.status(status).json({message, data});
});

mongoose
  .connect(
    ""
  )
  .then(() =>{
     const server = app.listen("2828")
     const io = require("./utils/socket.io").init(server);
     io.on("connection", (socket) => {
      console.log("client connected");
     });
    })
  .catch((err) => console.log("error in connecting to data base: \n", err));
