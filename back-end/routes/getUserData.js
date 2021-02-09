const express = require("express");
const router = express.Router();
var mysql = require("mysql");

router.get("/", (req, res, next) => {
  res.send("Inside Get user data");
});
router.get("/:user_data", (req, res, next) => {
  const user_name = res.req.params.user_data;

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "for_full_stack_app",
  });
  connection.connect();

  connection.query(
    `SELECT * FROM Users WHERE user_name = "${user_name}"`,
    (err, row, fields) => {
      if (err) throw err;
      else {
        //Check if Row exists
        console.log("Row is", row);
        res.send({ isValid: row.length === 1 });
      }
    }
  );
});

module.exports = router;
