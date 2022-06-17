const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const main = require("./router/main.js");
const email = require("./router/email.js");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/main", main);
app.use("/email", email);

app.listen(3000, () => {
  console.log("start!! express server");
});

