const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { CONNECTION_URL } = require("../Database/db_config");

router.post("/", (req, res, next) => {
  res.send("Inside POST of fileupload");
});

/**
 * Handling file upload
 * import multer and set the destination to store the file and file_name
 * If the file is uploaded succesfully, we return JSON object, with status true
 */
const multer = require("multer");
const { use } = require("./authenticateUser");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.originalname.split(".").slice(0, -1).join(".") +
        "-" +
        new Date().getTime() +
        ".txt"
    );
  },
});
let upload = multer({ dest: "uploads/", storage: storage });
router.post("/new", upload.single("file"), async (req, res, next) => {
  const file = req.file;
  const user_name = req.body.user_name;
  let wordCount = 22;
  //console.log("Before, wC=", wordCount);

  var fs = require("fs"),
    filename = file.path;
  fs.readFile(filename, "utf8", async (err, data) => {
    if (err) throw err;
    const words_count = data.split(" ").length;

    if (file) {
      //File is uploaded to uploads/fileName-milliseonds.txt
      //Store the path against user_name in UserStoredFile DB
      const uploadStatus = await uploadRecordToDB(
        user_name,
        file.path,
        words_count
      );
      if (uploadStatus) res.send({ uploadSuccess: true });
      else res.send({ uploadSuccess: false });
    } else {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }
  });
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
async function getWordCount(file) {}
module.exports = router;
