const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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
	res.render("email.ejs", {"email": req.body.email});
});

app.post("/ajaxSendEmail", (req, res) => {
	//console.log(req.body.email);
	let data = {"result": "ok", "email": req.body.email};
	res.json(data);
});