const express = require("express");
const router = express.Router();
var mysql = require("mysql");

router.get("/", (req, res, next) => {
  res.send("Inside host/newuser GET");
});

router.get("/:user_data", (req, res, next) => {
  const user_data = res.req.params.user_data;
  const [
    user_name,
    password,
    user_first_name,
    user_last_name,
    user_email,
  ] = user_data.split("&&");

  //insert to DB

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "for_full_stack_app",
  });
  connection.connect();
  connection.query(
    `INSERT INTO Users(user_name,password,user_first_name,user_last_name,user_email) VALUES("${user_name}","${password}",
    "${user_first_name}","${user_last_name}","${user_email}")`,
    (err, row, fields) => {
      if (err) res.send({ insertedToDB: false });
      else {
        console.log("Record inserted");
        res.send({ insertedToDB: true });
      }
    }
  );
});

module.exports = router;
