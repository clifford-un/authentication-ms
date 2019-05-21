const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config");
const {saveToken} = require("./token");

// To make the JWT more efficient we need 3 things
// var s = "some@user.com"; // Subject (intended user of the token)

function createToken(userName) {
	const payload = {
		// sub: user,
		// data1: "Data 1"
		// iat: moment().unix(),
		// exp: moment()
		// 	.add(14, "days")
		// 	.unix()
	};

	let signOptions = {
		issuer: config.Issuer,
		subject: userName.toString(),
		audience: config.Audience,
		expiresIn: config.Expiration_Time,
		algorithm: config.Algorithm // RSASSA options[ "RS256", "RS384", "RS512" ]
	};

	var token = jwt.sign(payload, config.SECRET_TOKEN, signOptions);
	saveToken(userName, token)
	return token;
}

module.exports = {
	createToken
};
