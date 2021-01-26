const express = require("express");
const PORT = 5000;
require("dotenv").config();
const { Client } = require("pg");
const cors = require("cors");
const { sequelize } = require("./models");

const { encrypt, decrypt } = require("./utils/EncryptionHandler");

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

app.use(cors());
app.use(express.json());

const {
	getPasswords,
	addPassword,
	decryptPassword,
	getGroups,
	addGroup,
} = require("./routes/passwords");

app.get("/api/passwords", getPasswords);
app.post("/api/add-password", addPassword);
app.post("/api/decrypt", decryptPassword);
app.get("/api/groups", getGroups);
app.post("/api/add-group", addGroup);

app.listen(PORT, console.log(`Listen on port: ${PORT}`));
