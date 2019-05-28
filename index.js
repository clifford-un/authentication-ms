const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config")
const router = require("./routes/api");
const {client} = require("./redisConnect");

const port = config.PORT;
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


