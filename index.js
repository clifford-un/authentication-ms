const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/api");
const redisConnect = require("./redisConnect");
const postgres = require("./postgres");

const port = process.env.PORT || 3000;
const app = express();

// parse application/json
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.listen(port, function() {
	console.log(`Hey, listen in ${port}`);
});

// initialize routes
app.use(router);

// error handling middleware
app.use(function(err, req, res, next) {
	// console.log(err);
	res.status(422).send({ error: err.message });
});

app.use(function(req, res, next) {
	res.status(404).send("404. Sorry cant find that!");
});
