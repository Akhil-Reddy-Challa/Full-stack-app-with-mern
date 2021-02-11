const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL =
  "mongodb+srv://root_admin:ACjVlZjHL05aMawq@userscluster.ur3rm.mongodb.net/UsersDatabase?retryWrites=true&w=majority";

const authenticateUserRouter = require("./routes/authenticateUser");
// const newUserCreationRouter = require("./routes/newUserCreation");
// const validateUserRouter = require("./routes/validateUser");
// const getUserDataRouter = require("./routes/getUserData");
// const fileUploadHandlerRouter = require("./routes/fileUploadhandler");

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/authenticateUser", authenticateUserRouter);
// app.use("/validateUser", validateUserRouter);
// app.use("/newuser", newUserCreationRouter);
// app.use("/getUserData", getUserDataRouter);
// app.use("/fileupload", fileUploadHandlerRouter);

var database, collection;
app.listen(3000, () => {
  console.log("Express Server Listening on Port 3000");
  //Test connection to MongoDB
  // MongoClient.connect(
  //   CONNECTION_URL,
  //   { useNewUrlParser: true, useUnifiedTopology: true },
  //   (error, client) => {
  //     if (error) {
  //       throw error;
  //     }
  //     console.log("Connected to DB succesfully!");
  //   }
  // );
});
// app.post("/person", (request, response) => {
//   collection.insert(request.body, (error, result) => {
//     if (error) {
//       return response.status(500).send(error);
//     }
//     response.send(result.result);
//   });
// });
// app.get("/people", (request, response) => {
//   collection.find({}).toArray((error, result) => {
//     if (error) {
//       return response.status(500).send(error);
//     }
//     response.send(result);
//   });
// });
// app.get("/person/:id", (request, response) => {
//   collection.findOne(
//     { _id: new ObjectId(request.params.id) },
//     (error, result) => {
//       if (error) {
//         return response.status(500).send(error);
//       }
//       response.send(result);
//     }
//   );
// });
