const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config");
const ms = require("ms");

// To make the JWT more efficient we need 3 things
var i = "Mysoft corp"; // Issuer (Software organization who issues the token)
var s = "some@user.com"; // Subject (intended user of the token)
var a = "http://mysoftcorp.in"; // Audience (Domain within which this token will live and function)

function decodeToken(token) {
	var verifyOptions = {
		issuer: i,
		// subject: user,
		audience: a,
		expiresIn: "20s",
		algorithm: ["HS256"]
	};

	var legit = jwt.verify(token, config.SECRET_TOKEN, verifyOptions);
	return legit
	// console.log("legit :", legit);
	// console.log("\nJWT verification result: " + JSON.stringify(legit));
}

var isAuth = function(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(403).send({ message: "No tienes autorizacion" });
	}

	const token = req.headers.authorization.split(" ")[1];
	const payload = decodeToken(token);

	// if (!payload) {
	// 	return res.status(403).send({ message: "Wrong token" });
	// }

	if (payload.exp < moment().unix()) {
		return res.status(401).send({ message: "El token ha expirado" });
	}

	req.user = payload.sub;
	// res.status(200).send({ message: "Tienes acceso" });
	next();
};

module.exports = {
	isAuth: isAuth
};
