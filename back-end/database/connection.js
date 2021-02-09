var mysql = require("mysql");
function connectToDB() {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "for_full_stack_app",
  });
  return connection;
}

function validateUserCredentials(user_data) {
  const connection = connectToDB();
  connection.connect();
  //extract data
  const [user_name, user_password] = user_data.split("&&");
  //Get data from  database

  connection.query(
    `SELECT * FROM Users WHERE user_name = "${user_name}" and password = "${user_password}"`,
    (err, row, fields) => {
      if (err) throw err;
      else {
        //Check if Row exists
        console.log("Row is", row);
        if (row.length === 1) {
          //User exists
          return true;
        } else return false;
      }
    }
  );
  connection.end();
}
module.exports = { validateUserCredentials };

/**
 * MYSQL
 * DB_NAME = for_full_stack_app
 * TABLE_NAME = Users
 * Schema:
 *  CREATE TABLE Users (
    id int NOT NULL AUTO_INCREMENT,
    user_name varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (id) 
    );
 */
