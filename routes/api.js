const express = require("express");
const router = express.Router();
const redis = require("ioredis");
const client = new redis(process.env.REDIS_URL);
const postgres = require("../controllers/postgres");
const { isAuth } = require("../middlewares/auth");

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
// 	console.log("router.use Time: ", Date.now());
// 	next();
// });

router.get("/", function(req, res, next) {
	res.status(200).send({ message: "Hola mundo (auth-ms)" });
});

router.get("/api", function(req, res, next) {
	res.status(200).send({ message: "This is an /api" });
});

router.post("/set", function(req, res, next) {
	console.log("req.body :", req.body);
	client.set("api_key", req.body.email, "EX", 30);
	res.status(201).send({ message: "email guardado" });
});

router.put("/set", function(req, res, next) {
	console.log("req.body :", req.body);
	client.set("api_key", req.body.email, "EX", 30);
	res.status(201).send({ message: "email guardado" });
});

router.get("/get/:key", async function(req, res, next) {
	let { key } = req.params;
	client.get(key, function(err, result) {
		var value = result;
		res.status(200).send({ value: value });
	});
	// ttl: ioredis y node_redis no tienen funciones por defecto para ttl, toca crear scripts con lua:
	// https://stackoverflow.com/questions/40028844/how-to-get-the-ttl-of-multiple-redis-keys-from-node
});

router.delete("/get/:key", function(req, res, next) {
	let { key } = req.params;
	client.del(key);
	res.status(200).send({ message: "email borrado" });
});

// router.post("/login", postgres.login);

router.get("/private", isAuth, function(req, res, next) {
	res.status(200).send({ message: "Tienes acceso" });
});

// error handling middleware
router.use(function(err, req, res, next) {
	res.status(422).send({ error: err.message });
});

router.use(function(req, res, next) {
	res.status(404).send("404. Sorry cant find that!");
});

module.exports = router;
