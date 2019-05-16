const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config");

// To make the JWT more efficient we need 3 things
var i = "Mysoft corp"; // Issuer (Software organization who issues the token)
var s = "some@user.com"; // Subject (intended user of the token)
var a = "http://mysoftcorp.in"; // Audience (Domain within which this token will live and function)

function createToken(user) {
	const payload = {
		// sub: user,
		data1: "Data 1",
		data2: "Data 2"
		// iat: moment().unix(),
		// exp: moment()
		// 	.add(14, "days")
		// 	.unix()
	};

	// Token signing options
	var signOptions = {
		issuer: i,
		subject: user,
		audience: a,
		expiresIn: "20s",
		algorithm: "HS256" // RSASSA options[ "RS256", "RS384", "RS512" ]
	};

	// let token = jwt.encode(payload, config.SECRET_TOKEN, "HS256");
	var token = jwt.sign(payload, config.SECRET_TOKEN, signOptions);
	console.log("token :", token);
	return token;
}

/*
 ====================   JST Verify =====================
*/
function decodeToken(token) {
	var verifyOptions = {
		issuer: i,
		// subject: user,
		audience: a,
		expiresIn: "12h",
		algorithm: ["HS256"]
	};
	
	var legit = jwt.verify(token, config.SECRET_TOKEN, verifyOptions);
	console.log("\nJWT verification result: " + JSON.stringify(legit));
}

// let t = createToken("user3");
// decodeToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhMSI6IkRhdGEgMSIsImRhdGEyIjoiRGF0YSAyIiwiaWF0IjoxNTU4MDIwMDI4LCJleHAiOjE1NTgwNjMyMjgsImF1ZCI6Imh0dHA6Ly9teXNvZnRjb3JwLmluIiwiaXNzIjoiTXlzb2Z0IGNvcnAiLCJzdWIiOiJzb21lQHVzZXIuY29tIn0.nj816sM7kH2zH40lHR5ogobxuS0uLMUEu8kWV3r86vI");
