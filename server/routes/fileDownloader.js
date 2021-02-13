const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  let file = "./uploads/localhost-1-1613167763759.txt";
  var path = require("path");
  console.log(path.toNamespacedPath("/uploads/localhost-1-1613167763759.txt"));

  res.download(file); // Set disposition and send it.
});

module.exports = router;
