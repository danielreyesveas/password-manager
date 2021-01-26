const Sequelize = require("sequelize");
const { Password, Group } = require("../models");
const { encrypt, decrypt } = require("../utils/EncryptionHandler");

exports.addPassword = async (request, response) => {
	const { name, groupId } = request.body;
	const { iv, password } = encrypt(request.body.password);

	try {
		const data = await Password.create({
			name,
			iv,
			password,
			groupId,
		});
		return response.status(200).json(data);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};

exports.getPasswords = async (requets, response) => {
	try {
		const data = await Password.findAll();
		return response.status(200).json(data);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};

exports.getGroups = async (requets, response) => {
	try {
		const data = await Group.findAll();
		return response.status(200).json(data);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};

exports.addGroup = async (request, response) => {
	const { name } = request.body;

	try {
		const data = await Group.create({
			name,
		});
		return response.status(200).json(data);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};

exports.decryptPassword = (request, response) => {
	try {
		const encryptedPassword = request.body;
		const decrypted = decrypt(encryptedPassword);
		return response.status(200).json({ decrypted });
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};
