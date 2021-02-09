const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const getDBCredentials = require("../database_schema/credentials");

router.post("/", (req, res, next) => {
  res.send("Inside POST");
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
