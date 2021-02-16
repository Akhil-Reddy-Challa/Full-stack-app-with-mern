const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { CONNECTION_URL } = require("../Database/db_config");

router.post("/", (req, res, next) => {
  res.send("Inside POST of fileupload");
});
function getPath(rootDirectory, original_file_name) {
  //chop ".txt" extension from the fileName
  const just_file_name = original_file_name.split(".").slice(0, -1).join(".");
  const random_number = new Date().getTime();
  let path;
  path =
    rootDirectory +
    "/server/uploads/" +
    just_file_name +
    "_" +
    random_number +
    ".txt";
  return path;
}
router.post("/new", async (req, res, next) => {
  try {
    const rootDirectory = process.cwd();
    const fileObject = req.files;
    const user_name = req.body.user_name;
    let wordCount = 0; //default_value
    let upload_path_and_file_name = getPath(
      rootDirectory,
      fileObject.file.name
    );
    // console.log(rootDirectory, user_name, wordCount);
    // console.log(upload_path_and_file_name);

    fileObject.file.mv(upload_path_and_file_name, async (err) => {
      if (!err) {
        //Find the word count
        const fs = require("fs");
        fs.readFile(upload_path_and_file_name, "utf8", async (err, data) => {
          if (!err) {
            wordCount = data.split(" ").length;
            // File is uploaded to uploads/fileName-milliseonds.txt
            // Store the path against user_name in DB("UserStoredFile")
            const uploadStatus = await uploadRecordToDB(
              user_name,
              upload_path_and_file_name,
              wordCount
            );
            //console.log("File uploaded!");
            if (uploadStatus)
              res.send({
                uploadSuccess: true,
                upload_path_and_file_name,
                wordCount,
              });
            else res.send({ uploadSuccess: false });
          }
        });
      }
    });
  } catch (err) {
    console.log("Stack trace:", err);
  }
});
async function uploadRecordToDB(user_name, file_path, word_count) {
  const client = new MongoClient(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // The database to use
  const dbName = "UsersDatabase";
  //Create data object
  const dateString = new Date().toString();
  const dataObject = {
    user_name: user_name,
    file_path: file_path,
    upload_date: dateString,
    word_count: word_count,
  };
  let insertStatus = false;
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("UserStoredFiles");
    // Insert a single document, wait for promise so we can read it back
    const p = await collection.insertOne(dataObject);
    //Inserted into DB
    insertStatus = true;
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    return insertStatus;
  }
}
module.exports = router;
