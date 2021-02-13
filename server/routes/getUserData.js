const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { CONNECTION_URL } = require("../Database/db_config");

router.post("/", async (req, res, next) => {
  const user = req.body;
  //console.log(user.user_name);
  const user_data_packet = await fetchDatafromDB(user.user_name);
  //console.log(user_data);
  if (user_data_packet) {
    //Delete the password field in object
    delete user_data_packet["user_password"];
    res.send(user_data_packet);
  } else res.send({});
});

async function fetchDatafromDB(user_name) {
  const client = new MongoClient(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // The database to use
  const dbName = "UsersDatabase";
  let userObject = null;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("UsersList");
    userObject = await collection.findOne({
      user_name: user_name,
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    return userObject;
  }
}

module.exports = router;
