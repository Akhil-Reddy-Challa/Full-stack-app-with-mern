const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

const authenticateUserRouter = require("./routes/authenticateUser");
const newUserCreationRouter = require("./routes/newUserCreation");
const getUserDataRouter = require("./routes/getUserData");
const fileUploadHandlerRouter = require("./routes/fileUploadhandler");
const userFilesDataRouter = require("./routes/fetchUserFiles");
const fileDeleteRouter = require("./routes/fileDelete");

app.use("/authenticateUser", authenticateUserRouter);
app.use("/newuser", newUserCreationRouter);
app.use("/getUserData", getUserDataRouter);
app.use("/fileupload", fileUploadHandlerRouter);
app.use("/files", userFilesDataRouter);
app.use("/delete", fileDeleteRouter);

app.get("/download/:file_name", (req, res, next) => {
  const file = __dirname + "/uploads/" + req.params.file_name;

  res.download(file); // Set disposition and send it.
});
app.use(express.static("uploads"));
var server = app.listen(3000, () => {
  console.log("Express Server Listening on Port 3000");
});

//Error Handling statements
function handleTermination(signal) {
  // If a termination signal is received.
  console.info(signal + "*******  received. *******");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    process.exit(1);
  });
}
process.on("SIGTERM", handleTermination);
process.on("SIGINT", handleTermination);
process.on("uncaughtException", handleTermination);
