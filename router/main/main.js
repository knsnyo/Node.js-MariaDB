const express = require("express");
const router = express.Router();
const path = require("path");

// main은 로그인 될 때만(session info 있을 때만)
router.get("/", (req, res) => {
  // __dirname === ./
  let id = req.user;
  //res.sendFile(path.join(__dirname, "../public/main.html"));
  if (!id) res.render("login.ejs");
  else res.render("welcome.ejs", { id: id });
});

module.exports = router;
