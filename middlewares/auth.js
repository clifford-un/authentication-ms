const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config");
const ms = require("ms");

function decodeToken(token) {
	var verifyOptions = {
		issuer: config.Issuer,
		// subject: user,
		audience: config.Audience,
		expiresIn: config.Expiration_Time,
		algorithm: config.Algorithm
	};

	var legit = jwt.verify(token, config.SECRET_TOKEN, verifyOptions);
	return legit
}

var isAuth = function(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(403).send({ error: "No tienes autorizacion" });
	}

	const token = req.headers.authorization.split(" ")[1];
	const payload = decodeToken(token);

	// if (!payload) {
	// 	return res.status(403).send({ message: "Wrong token" });
	// }

	if (payload.exp < moment().unix()) {
		return res.status(401).send({ error: "El token ha expirado" });
	}

	req.user = payload.sub;
	// res.status(200).send({ message: "Tienes acceso" });
	next();
};

module.exports = {
	isAuth: isAuth
};
