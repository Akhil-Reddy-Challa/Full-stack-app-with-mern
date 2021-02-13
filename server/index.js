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

app.use("/authenticateUser", authenticateUserRouter);
app.use("/newuser", newUserCreationRouter);
app.use("/getUserData", getUserDataRouter);
app.use("/fileupload", fileUploadHandlerRouter);
app.use("/files", userFilesData);

app.get("/download/:file_name", (req, res, next) => {
  const file = __dirname + "/uploads/" + req.params.file_name;

  res.download(file); // Set disposition and send it.
});

var server = app.listen(3000, () => {
  console.log("Express Server Listening on Port 3000");
});

//Error Handling statements
process.on("SIGTERM", () => {
  // If a termination signal is received.
  console.info("******* SIGTERM signal received. *******");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    process.exit(1);
  });
});

process.on("SIGINT", () => {
  // If a user enters CTRL-C on terminal
  console.info("******* Caught Interrupt signal. *******");
  console.log("Closing server.");
  server.close(() => {
    console.log("Server closed.");
    process.exit(1);
  });
});
process.on("uncaughtException", (err) => {
  // Any uncaught exceptions are received.
  console.info("******* Uncaught exception signal received. *******");
  console.log("Closing http server.", err);
  server.close(() => {
    console.log("Http server closed.");
    process.exit(1);
  });
});
