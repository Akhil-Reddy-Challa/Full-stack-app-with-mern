const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const getDBCredentials = require("../database_schema/credentials");

router.post("/", (req, res, next) => {
  res.send("Inside POST");
});
router.get("/:user_data", (req, res, next) => {
  const user_data = res.req.params.user_data;
  const [user_name, user_password] = user_data.split("&&");

  var connection = mysql.createConnection(getDBCredentials);
  connection.connect();
  connection.query(
    `SELECT * FROM Users WHERE user_name = "${user_name}" and password = "${user_password}"`,
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
