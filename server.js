const express = require("express");
const PORT = 5000;
const { Client } = require("pg");
const cors = require("cors");

const { encrypt, decrypt } = require("./EncryptionHandler");

const connectionString =
	"postgres://postgres:JGDO.jgdo.5620@localhost:5432/password_manager";
const client = new Client({
	user: "postgres",
	host: "localhost",
	database: "password_manager",
	password: "JGDO.jgdo.5620",
	port: "5432",
});

client.connect();
const app = express();

app.get("/", (request, response) => {
	response.send("Hello friend...");
});

app.use(cors());
app.use(express.json());

app.post("/add-password", (request, response) => {
	const { title } = request.body;
	const { iv, password } = encrypt(request.body.password);

	try {
		client.query(
			`INSERT INTO passwords (title, iv, password) VALUES ('${title}', '${iv}', '${password}' )`,
			function (err, result) {
				if (err) {
					response.status(400).send(err);
				}
				response.status(200).send(result);
			}
		);
	} catch (error) {
		return response.json({ error: error });
	}
});

app.get("/passwords", (request, response) => {
	try {
		client.query("SELECT * FROM passwords;", (error, result) => {
			if (error) {
				console.log(error);
			} else {
				response.send(result.rows);
			}
		});
	} catch (error) {
		return response.json({ error: error });
	}
});

app.post("/decrypt", (request, response) => {
	try {
		const encryptedPassword = request.body;
		const decrypted = decrypt(encryptedPassword);

		return response.json({ decrypted });
	} catch (error) {
		return response.json({ error: error });
	}
});

app.listen(PORT, console.log(`Server is running at: ${PORT}`));
