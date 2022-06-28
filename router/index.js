const express = require("express");
const router = express.Router();
const path = require("path");

const main = require("./main/main.js");
const email = require("./email/email.js");
const join = require("./join/index.js");
const login = require("./login/login.js");

router.use("/main", main);
router.use("/email", email);
router.use("/join", join);
router.use("/login", login);

router.get("/", (req, res) => {
  // __dirname === ./
  res.sendFile(path.join(__dirname, "../public/main.html"));
});

module.exports = router;