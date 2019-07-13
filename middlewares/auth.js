const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config");
const { client } = require("../redisConnect");
// const { userHasToken } = require("../controllers/token");

function decodeToken(token, res) {
	var verifyOptions = {
		issuer: config.Issuer,
		// subject: user,
		audience: config.Audience,
		expiresIn: config.Expiration_Time,
		algorithm: config.Algorithm
	};

	var legit = jwt.verify(token, config.SECRET_TOKEN, verifyOptions,function (err, decoded) {
		if (err) {
			res.status(401).send({ error: err.message });
		}
	});
	return legit;
}

function isAuth(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(403).send({ error: "No tienes autorizacion" });
	}

	const token = req.headers.authorization.split(" ")[1];
	let { userName } = req.params;
	client.get(userName, function(err, result) {
		console.log('userName :', userName);
		console.log('result :', result);
		console.log('token :', token);
		if (!result) {
			return res.status(401).send({ message: "No existe el usuario en Redis" });
		}
		if (result && token === result) {
			// console.log("TRUE");
			return res.status(200).send({ message: "Tienes acceso" });
		}
		else if (token !== result){
			return res.status(401).send({ message: "Token viejo" });
			// const payload = decodeToken(token, res);
			// req.user = payload.sub
		}
	});
	next();
};

module.exports = {
	isAuth
};
