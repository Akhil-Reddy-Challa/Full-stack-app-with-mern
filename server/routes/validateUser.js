const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const getDBCredentials = require("../database_schema/credentials");

router.get("/", (req, res, next) => {
  res.send("Inside POST");
  const sqlite3 = require("sqlite3").verbose();
  console.log(sqlite3);
});
router.get("/:user_data", (req, res, next) => {
  const user_name = res.req.params.user_data;

  var connection = mysql.createConnection(getDBCredentials);
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
