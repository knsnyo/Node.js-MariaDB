const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
  console.log("start!! express server");
});


app.get("/", (req, res) => {
	//res.send("hi friend!");
	// __dirname === ./
	res.sendFile(__dirname + "/public/main.html");
});

app.post("/emailPost", (req, res) => {
	console.log(req.body);
	res.send(`Welcome: ${req.body.email}`);
});