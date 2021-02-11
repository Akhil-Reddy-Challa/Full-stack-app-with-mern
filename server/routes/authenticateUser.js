const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { use } = require("./getUserData");

router.get("/", (req, res, next) => {
  res.send("Inside get of AuthenticateUser");
});
router.get("/:user_data", async (req, res, next) => {
  const user_data = res.req.params.user_data;
  const [user_name, user_password] = user_data.split("&&");
  //Check for user_data in MongoDB
  let userExists = await checkInDBFor(user_name, user_password);
  if (userExists) res.send({ userExists: true });
  else res.send({ userExists: false });
});
async function checkInDBFor(name, password) {
  const CONNECTION_URL =
    "mongodb+srv://root_admin:ACjVlZjHL05aMawq@userscluster.ur3rm.mongodb.net/UsersDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // The database to use
  const dbName = "UsersDatabase";
  let userObject = null;
  let answer = false;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("UsersList");
    userObject = await collection.findOne({
      user_name: name,
    });
    //Now check the password
    answer = userObject.password === password;
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    return answer;
  }
}
module.exports = router;
