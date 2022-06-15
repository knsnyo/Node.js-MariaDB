const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "nodejs",
});

connection.connect();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("start!! express server");
});

app.get("/", (req, res) => {
  // __dirname === ./
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/emailPost", (req, res) => {
  //console.log(req.body);
  //res.send(`Welcome: ${req.body.email}`);
  res.render("email.ejs", { id: req.body.id });
});

app.post("/ajaxSendEmail", (req, res) => {
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
