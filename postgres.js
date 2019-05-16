const { Pool, Client } = require("pg");

// pools will use environment variables
// for connection information
const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "users-db",
	password: "123456",
	port: 5432
});

function printAllUsers() {
	let query = {
		text: "SELECT * FROM users"
	}

	pool.query(query, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res.rows);
		}
		pool.end();
	});
}

function updatePassword(userName, password) {
	let query = {
		text: `UPDATE users
		SET password = $2
		WHERE user_name = $1`,
		values: [userName, password]
	};
	pool.query(query, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Postgres: Contraseña cambiada");
		}
		pool.end();
	});
}

// // --build-arg HTTP_PROXY=http://168.176.239.41:8080 --build-arg HTTPS_PROXY=http://168.176.239.41:8080

// updatePassword("user4","secret4")
printAllUsers()
