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

const ldap = require("ldapjs");
const clientLDAP = ldap.createClient({
	url: "ldap://" + process.env.LDAP_URL
});

const dn = "cn=admin,dc=kwii,dc=unal,dc=edu,dc=co";
clientLDAP.bind(dn, "admin", function(err, result) {
	if (err) {
		console.log("LDAP Client bind error: " + err);
	} else {
		console.log("LDAP client connected");
	}
});

module.exports = {
	client,
	clientLDAP
};
