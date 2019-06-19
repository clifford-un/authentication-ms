const ms = require("ms");
const config = require("../config");
const { client } = require("../redisConnect");

function saveToken(userName, token) {
	client.set(userName, token, "PX", ms(config.Expiration_Time));
	console.log(`saveToken for ${userName}`);
}

function deleteToken(userName) {
	client.del(userName);
	console.log(`Deleted Token for ${userName}`);
}

// function userHasToken(userId, token) {
// 	client.get(userId, function(err, result) {
// 		if (result && token == result) {
// 			console.log("Todo correcto");
// 			return true
// 		}
// 	});
// }

module.exports = {
	saveToken,
	deleteToken
};
