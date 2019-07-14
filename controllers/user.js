const { Pool } = require("pg");
const { createToken } = require("./auth");
const { deleteToken } = require("./token");
const { clientLDAP } = require("../redisConnect");
const config = require("../config");
const org = "ou=kwii,dc=kwii,dc=unal,dc=edu,dc=co";

// pools will use environment variables
// for connection information
// const pool = new Pool({
// 	user: "postgres",
// 	host: process.env.DB_HOST || "testing-db",
// 	database: "test_sebasp",
// 	// password: "123456",
// 	port: 5432
// });

const connectionString = config.CONNECT_PSQL;

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
		WHERE user_name = $1 AND password = $2`,
		values: [userName, password]
	};

	let search_options = {
		scope: "sub",
		filter: "&(cn=" + userName + ")"
	};

	clientLDAP.search(org, search_options, async function(err, response) {
		console.log("LDAP Search res:");
		console.log(response);
		if (err) {
			console.log("LDAP search error: " + err);
		} else {
			ldap_name = undefined;
			ldap_pswd = undefined;

			await response.on("searchEntry", function(entry) {
				ldap_name = entry.object.cn;
				ldap_pswd = entry.object.userPassword;

				console.log("entry: " + JSON.stringify(entry.object));
				
				return;
			});
			response.on("end", function(result) {
				if(ldap_name == undefined || ldap_pswd == undefined){
					res.status(401).send({ message: "Usuario no encontrado en el directorio LDAP" });
				}else{
					if(password == ldap_pswd){
						pool.query(query, (err, resp) => {
							if (err) {
								console.log(err);
							} else {
								var user = resp.rows[0];
								if (user !== undefined) {
									let token = createToken(userName);
									console.log("Token creado");
									res
										.status(201)
										.send({
											jwt: token,
											user_id: user["id"],
											user_name: user["user_name"]
										});
								} else {
									res.status(401).send({ message: "userName y password incorrectos" });
								}
							}
							// pool.end();
						});
					}else{
						res.status(401).send({ message: "userName y password incorrectos" });
					}
				}
				console.log("search status: " + result.status);
			});
		}
	});
}

function removeToken(req, res, next) {
	let userName = req.body.userName;
	deleteToken(userName);
	res.status(201).send({ message: "token borrado de redis" });
}

module.exports = {
	getAllUsers,
	login,
	removeToken
};
