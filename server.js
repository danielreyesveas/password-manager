const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const { Client } = require("pg");
const cors = require("cors");
const { sequelize } = require("./models");

const { encrypt, decrypt } = require("./utils/EncryptionHandler");

const app = express();

app.use(cors());
app.use(express.json());

const { getGroups, addGroup, updateGroup } = require("./routes/groups");

const {
	getPasswords,
	getPassword,
	addPassword,
	updatePassword,
	decryptPassword,
} = require("./routes/passwords");

app.get("/api/groups", getGroups);
app.post("/api/add-group", addGroup);
app.post("/api/update-group", updateGroup);

app.get("/api/passwords", getPasswords);
app.get("/api/get-password/:id", getPassword);
app.post("/api/add-password", addPassword);
app.post("/api/update-password", updatePassword);
app.post("/api/decrypt-password", decryptPassword);

app.listen(PORT, console.log(`Listen on port: ${PORT}`));
