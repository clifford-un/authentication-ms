const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();

// parse application/json
app.use(bodyParser.json());

app.get("/", function(req, res, next) {
    res.status(200).send({ name: "Hola mundo (auth-ms)" });
  });
  

app.listen(port, function() {
  console.log(`Hey, listen in ${port}`);
});

app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});