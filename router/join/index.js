const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// DATABASE setting
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "nodejs",
});
connection.connect();

router.get("/", (req, res) => {
  res.render("join.ejs");
  //res.sendFile(path.join(__dirname, "../../public/join.html"));
});

passport.use("local-join", new LocalStrategy({
    usernameField: "id",
    passwordField: "password",
    passReqToCallback: true,
  }, (req, email, password, done) => {
    console.log("local-join callback called");
  }
));


router.post("/", passport.authenticate("local-join", {
  successRedirect: "/main",
  failureRedirect: "/join",
  failureFlash: true,
}));
/*
router.post("/", (req, res) => {
  const body = req.body;
  const id = body.id;
  const password = body.password;
  const email = body.email;

  let data = { id: id, password: password, email: email };
  let sql = "insert into user set ? ";

  let query = connection.query(sql, data, (err, rows) => {
    if (err) {
      throw err;
    } else {
			console.log("ok db insert");
			res.render("welcome.ejs", {"id": id});
		}
  });
});
*/

module.exports = router;
