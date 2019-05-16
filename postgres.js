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
		// pool.end();
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
		// pool.end();
	});
}

function login(userId, password) {
	let query = {
		text: `SELECT * FROM users
		WHERE user_id = $1 AND password = $2`,
		values: [userId, password]
	};
	pool.query(query, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			var user = res.rows[0]
			// console.log('user :', user);
			// console.log('typeof user :', typeof user);
			if (user !== undefined) {
				console.log("Existe un usuario");
			}
			else {
				console.log("userId y password incorrectos");
			}
		}
		pool.end();
	});
}

// // --build-arg HTTP_PROXY=http://168.176.239.41:8080 --build-arg HTTPS_PROXY=http://168.176.239.41:8080

// updatePassword("user4","secret4")
// printAllUsers()
console.log("------");
login(3, "secret3")
