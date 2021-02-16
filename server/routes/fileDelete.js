const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { MONGODB_URI } = require("../Database/db_config");

router.post("/", async (req, res, next) => {
  const { file_path } = req.body;
  const deletionStatus = await deleteRecordFromDB(file_path);
  res.send({ isDeleted: deletionStatus });
});
async function deleteRecordFromDB(file_path) {
  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // The database to use
  const dbName = "UsersDatabase";
  //Create data object
  const dateString = new Date().toString();
  const dataObject = {
    file_path,
  };
  let deletionStatus = false;
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("UserStoredFiles");
    // Insert a single document, wait for promise so we can read it back
    const p = await collection.deleteOne(dataObject);
    //Inserted into DB
    deletionStatus = true;
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    return deletionStatus;
  }
}
module.exports = router;
