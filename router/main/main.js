const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  // __dirname === ./
  let id = req.user;
  //res.sendFile(path.join(__dirname, "../public/main.html"));
  res.render("welcome.ejs", {"id": id});
});

module.exports = router;