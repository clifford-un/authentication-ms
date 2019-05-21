const { Pool } = require("pg");
const { createToken } = require("./auth");

// pools will use environment variables
// for connection information
// const pool = new Pool({
// 	user: "postgres",
// 	host: process.env.DB_HOST || "testing-db",
// 	database: "test_sebasp",
// 	// password: "123456",
// 	port: 5432
// });

const connectionString =
	"postgresql://postgres@192.168.99.101:5432/test_sebasp";

const pool = new Pool({
	connectionString: connectionString
});

pool.connect((err, client, done) => {
	if (err) {
		console.log(`Something went wrong with Postgres: ${err}`);
	} else {
		console.log("Postgres database connected");
	}
});

function getAllUsers() {
	let query = {
		text: "SELECT * FROM users"
	};

	pool.query(query, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res.rows);
		}
	});
}

// function updatePassword(userName, password) {
// 	let query = {
// 		text: `UPDATE users
// 		SET password = $2
// 		WHERE user_name = $1`,
// 		values: [userName, password]
// 	};
// 	pool.query(query, (err, res) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("Postgres: Contraseña cambiada");
// 		}
// 	});
// }

function login(req, res, next) {
	let userName = req.body.userName;
	let password = req.body.password;
	let query = {
		text: `SELECT * FROM users
		WHERE user_id = $1 AND password = $2`,
		values: [userName, password]
	};
	pool.query(query, (err, resp) => {
		if (err) {
			console.log(err);
		} else {
			var user = resp.rows[0];
			if (user !== undefined) {
				let token = createToken(userName);
				console.log("Token creado");
				res.status(201).send({ jwt: token });
			} else {
				res.status(401).send({ message: "userName y password incorrectos" });
			}
		}
		// pool.end();
	});
}

module.exports = {
	getAllUsers,
	login
};
