const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authenticateUserRouter = require("./routes/authenticateUser");
const newUserCreationRouter = require("./routes/newUserCreation");
const getUserDataRouter = require("./routes/getUserData");
const fileUploadHandlerRouter = require("./routes/fileUploadhandler");
const userFilesData = require("./routes/fetchUserFiles");
const fileDownloader = require("./routes/fileDownloader.js");

app.use("/authenticateUser", authenticateUserRouter);
app.use("/newuser", newUserCreationRouter);
app.use("/getUserData", getUserDataRouter);
app.use("/fileupload", fileUploadHandlerRouter);
app.use("/files", userFilesData);
//app.use("/download", fileDownloader);

app.get("/download/:file_name", (req, res, next) => {
  const file = __dirname + "/uploads/" + req.params.file_name;

  res.download(file); // Set disposition and send it.
});

app.listen(3000, () => {
  console.log("Express Server Listening on Port 3000");
});
