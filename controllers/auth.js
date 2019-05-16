const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("../config");

function createToken(user) {
	const payload = {
		sub: user,
		iat: moment().unix(),
		exp: moment()
			.add(14, "days")
			.unix()
	};

	let token = jwt.encode(payload, config.SECRET_TOKEN, "HS256");
	return token;
}

function decodeToken(token) {
	try {
		let decoded = jwt.decode(token, config.SECRET_TOKEN, true, "HS256");
		console.log("payload :", decoded);
		return decoded;
	} catch (error) {
        console.log('Wrong token');
    }
}

let t = createToken("user3")
decodeToken(t);
