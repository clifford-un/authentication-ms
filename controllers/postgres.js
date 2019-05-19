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

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
// pool.on("error", (err, client) => {
// 	console.error("Unexpected error on idle client", err);
// 	// process.exit(-1);
// });

// // // callback - checkout a client

const connectionString =
	"postgresql://postgres@192.168.99.101:5432/test_sebasp";

const pool = new Pool({
	connectionString: connectionString
});

pool.connect((err, client, done) => {
	if (err) {
		console.log(`Something wrong: ${err}`);
	}
	console.log("Postgres database connected");
});

// pg.connect('postgres://postgres:password@localhost:5432/practicedocker');

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
			console.log("Postgres: Contraseña cemailambiada");
		}
	});
}

function login(req, res, next) {
	let userId = req.body.userId;
	let password = req.body.password;
	let query = {
		text: `SELECT * FROM users
		WHERE user_id = $1 AND password = $2`,
		values: [userId, password]
	};
	pool.query(query, (err, resp) => {
		if (err) {
			console.log(err);
		} else {
			var user = resp.rows[0];
			if (user !== undefined) {
				let token = createToken(userId);
				res.status(201).send({ jwt: token });
			} else {
				res.status(401).send({ error: "userId y password incorrectos" });
			}
		}
		// pool.end();
	});
}

getAllUsers();

module.exports = {
	getAllUsers,
	updatePassword,
	login
};
