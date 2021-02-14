const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { CONNECTION_URL } = require("../Database/db_config");

router.post("/", async (req, res, next) => {
  const user = req.body;
  const user_name = user.user_name;
  console.log("Getting files of user", user_name);
  const user_files = await fetchFilesDatafromDB(user_name);
  console.log(user_files);

  res.send(user_files);
});
async function fetchFilesDatafromDB(user_name) {
  const client = await new MongoClient(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // The database to use
  const dbName = "UsersDatabase";
  let userFiles = [];
  let object = {};
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("UserStoredFiles");
    let db_cursor = await collection
      .find({
        user_name: user_name,
      })
      .forEach((data_obj) => {
        userFiles.push(data_obj.file_path + "/" + data_obj.word_count);
      });
    object = userFiles;
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    return object;
  }
}
module.exports = router;
