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
  let msg;
  let errMsg = req.flash("error");
  if (errMsg) msg = errMsg;
  res.render("login.ejs", { message: msg });
  //res.sendFile(path.join(__dirname, "../../public/join.html"));
});

passport.serializeUser((user, done) => {
  console.log(`passport session save: ${user.id}`);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`passport session get id: ${id}`);
  done(null, id);
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, id, password, done) => {
      var query = connection.query(
        "select * from user where id=?",
        [id],
        (err, rows) => {
          if (err) return done(err);

          if (rows.length) {
            console.log("login");
            return done(null, {"id": id});
          } else {
						return done(null, false, {"message": "login failure"})
          }
        }
      );
    }
  )
);

/*
router.post(
  "/",
  passport.authenticate("local-join", {
    successRedirect: "/main",
    failureRedirect: "/join",
    failureFlash: true,
  })
);
*/

router.post("/", (req, res, next) => {
	passport.authenticate("local-login", (err, user, info) => {
		if (err) { 
			res.status(500).json(err);
		}
		if(!user) {
			return res.status(401).json(info.message);
		}

		req.logIn(user, (err) => {
			if (err) { return next(err); }
			return res.json(user);
		})
	})(req, res, next);
})

module.exports = router;
