const { Pool, Client } = require("pg");

// pools will use environment variables
// for connection information
const pool = new Pool({
	user: "shibaby",
	host: "localhost",
	database: "shibaby_files",
	password: "12345",
	port: 5432
});

// pool.query("SELECT NOW()", (err, res) => {
// 	console.log(err, res);
// 	pool.end();
// });

// clients will also use environment variables
// for connection information
const client = new Client({
	user: "postgres",
	host: "localhost",
    database: "linuxhint",
    // password: "12345"
	port: 5432
});
client.connect();

// let query = 'CREATE TABLE users (    firstname   VARCHAR(20),lastname    VARCHAR(20))';

const query = {
	text: "SELECT * FROM USERS"
};


client.query(query, (err, res) => {
	if (err) {
		console.log("--- err ---");
		console.log(err);
	} else {
		console.log(res.rows[0]);
	}
	client.end();
});

// --build-arg HTTP_PROXY=http://168.176.239.41:8080 --build-arg HTTPS_PROXY=http://168.176.239.41:8080