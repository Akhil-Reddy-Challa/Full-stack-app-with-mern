const mongoose = require("mongoose");

const user = new mongoose.Schema({
  user_name: {
    type: String,
  },
  password: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = User = mongoose.model("user", user);
