const redis = require("ioredis");
const client = new redis(process.env.REDIS_URL);

// Connection and Events:

client.on("connect", function() {
	console.log("Redis client connected");
});

client.on("reconnecting", function() {
	console.log("Redis client is trying to reconnect");
});

client.on("error", function(err) {
	if (err) {
		console.log("Something went wrong (Redis): " + err);
	}
});

client.on("end", function(err) {
	console.log("Redis client closed");
});

module.exports = {client};
