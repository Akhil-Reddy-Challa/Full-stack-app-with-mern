const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  res.send("Inside POST of fileupload");
});

/**
 * Handling file upload
 * import multer and set the destination to store the file and file_name
 * If the file is uploaded succesfully, we return JSON object, with status true
 */
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});

let upload = multer({ dest: "uploads/", storage: storage });
router.post("/new", upload.single("file"), (req, res, next) => {
  const file = req.file;
  if (file) {
    res.send({ uploadSuccess: true });
  } else {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return next(error);
  }
});

module.exports = router;
