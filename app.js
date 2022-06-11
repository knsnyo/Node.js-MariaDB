const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("start!! express server");
});

app.get("/", (req, res) => {
	//res.send("hi friend!");
	// __dirname === ./
	res.sendFile(__dirname + "/public/main.html");
});