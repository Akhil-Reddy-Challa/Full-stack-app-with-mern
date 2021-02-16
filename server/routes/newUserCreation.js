const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { MONGODB_URI } = require("../Database/db_config");

router.post("/", async (req, res, next) => {
  //Inside new user creation
  const user_data = req.body;
  //console.log(user_data);
  const userExists = await userExistsInDB(user_data.user_name);
  if (!userExists) {
    // console.log("User dont exist, so inserting into DB");
    const responseFromDB = insertToDB(user_data);
    if (responseFromDB) res.send({ userCreated: true });
    else res.send({ userCreated: false });
  } else {
    res.send({ userCreated: false });
  }
});

async function insertToDB(user_data) {
  const client = new MongoClient(MONGODB_URI, {
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
    // Insert a single document, wait for promise so we can read it back
    const p = await collection.insertOne(user_data);
    //Inserted into DB
    // console.log(p);

    return true;
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    return false;
  }
}
async function userExistsInDB(name) {
  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // The database to use
  const dbName = "UsersDatabase";
  let userObject = false;

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
