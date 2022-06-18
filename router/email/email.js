const express = require("express");
const router = express.Router();
const path = require("path");

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

router.post("/form", (req, res) => {
  //console.log(req.body);
  //res.send(`Welcome: ${req.body.email}`);
  res.render("email.ejs", { id: req.body.id });
});

router.post("/ajax", (req, res) => {
  let resData = {};
  let query = `SELECT * FROM user WHERE id = "${req.body.id}";`;
  let result = connection.query(query, (err, rows) => {
    if (err) {
      throw err;
    }
    if (rows[0]) {
      resData.result = "ok";
      resData.id = rows[0].id;
      resData.email = rows[0].email;
    } else {
      resData.result = "none";
      resData.id = "";
      resData.email = "";
    }

    res.json(resData);
  });
});

module.exports = router;