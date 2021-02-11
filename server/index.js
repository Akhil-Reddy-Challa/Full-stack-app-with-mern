const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authenticateUserRouter = require("./routes/authenticateUser");
const newUserCreationRouter = require("./routes/newUserCreation");
const validateUserRouter = require("./routes/validateUser");
const getUserDataRouter = require("./routes/getUserData");
const fileUploadHandlerRouter = require("./routes/fileUploadhandler");

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/authenticateUser", authenticateUserRouter);
app.use("/validateUser", validateUserRouter);
app.use("/newuser", newUserCreationRouter);
app.use("/getUserData", getUserDataRouter);
app.use("/fileupload", fileUploadHandlerRouter);

app.listen(3000, () => {
  console.log("Express Server Listening on Port 3000");
});
