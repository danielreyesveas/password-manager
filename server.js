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

const { login, register, loginWithGoogle } = require("./routes/auth");
const { auth } = require("./middleware/auth");

const {
	getGroups,
	addGroup,
	updateGroup,
	deleteGroup,
} = require("./routes/groups");

const {
	getPasswords,
	getPassword,
	addPassword,
	updatePassword,
	decryptPassword,
	deletePassword,
} = require("./routes/passwords");

app.get("/api", (req, res) => {
	res.send("Hello Friend...");
});

app.post("/api/login", login);
app.post("/api/login-with-google", loginWithGoogle);
app.post("/api/register", register);

app.get("/api/groups", auth, getGroups);
app.post("/api/add-group", auth, addGroup);
app.post("/api/update-group", auth, updateGroup);
app.post("/api/delete-group", auth, deleteGroup);

app.get("/api/passwords", auth, getPasswords);
app.get("/api/get-password/:id", auth, getPassword);
app.post("/api/add-password", auth, addPassword);
app.post("/api/update-password", auth, updatePassword);
app.post("/api/decrypt-password", auth, decryptPassword);
app.post("/api/delete-password", auth, deletePassword);

app.listen(PORT, console.log(`Listen on port: ${PORT}`));
