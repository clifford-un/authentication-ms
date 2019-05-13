const redis = require("ioredis");

// const client = redis.createClient(6379, 'redis-db');
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
        // throw error;
      }
});

client.on("end", function(err) {
  console.log("Redis client closed");
});

// ------------------

// client.set("my test key", "my test value", redis.print);
// client.get("my test key", function(error, result) {
//   if (error) {
//     console.log(error);
//     throw error;
//   }
//   console.log("GET result -> " + result);
// });

module.exports = redis;
// module.exports = client;
