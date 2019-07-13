const express = require("express");
const router = express.Router();
const { client } = require("../redisConnect");
const user = require("../controllers/user");
const { isAuth } = require("../middlewares/auth");

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
// 	console.log("router.use Time: ", Date.now());
// 	next();
// });

// router.delete("/get/:key", function(req, res, next) {
// 	let { key } = req.params;
// 	client.del(key);
// 	res.status(200).send({ message: "email borrado" });
// });

router.get("/", function(req, res, next) {
	console.log("Hola mundo (auth-ms)");
	res.status(200).send({ message: "Hola mundo (auth-ms)" });
});

router.post("/login", user.login);

router.get("/login/:userName", isAuth, function(req, res, next) {
	console.log("EXAMPLE");
});

router.post("/removeToken", user.removeToken);

// error handling middleware
router.use(function(err, req, res, next) {
	res.status(422).send({ error: err.message });
});

router.use(function(req, res, next) {
	console.log("404. Sorry cant find that!");
	res.status(404).send("404. Sorry cant find that!");
});

module.exports = router;
