const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { CONNECTION_URL } = require("../Database/db_config");

router.post("/", async (req, res) => {
  const user_creds = req.body;
  console.log(user_creds);

  //Check for user_data in MongoDB
  const user_data = await checkInDBFor(user_creds.user_name);
  console.log(user_data);
  //Validate user object
  if (user_data) {
    res.send(user_data);
  } else {
    res.send({});
  }
});

async function checkInDBFor(name) {
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
      user_name: name,
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    return userObject;
  }
}
module.exports = router;
