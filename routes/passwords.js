const Sequelize = require("sequelize");
const { Password } = require("../models");
const { encrypt, decrypt } = require("../utils/EncryptionHandler");

exports.addPassword = async (request, response) => {
	const user = response.locals.user;
	const { name, groupId, website, username, notes } = request.body;
	const { iv, password } = encrypt(request.body.password);

	try {
		const data = await Password.create({
			name,
			groupId,
			website,
			username,
			notes,
			iv,
			password,
			userId: user.id,
		});
		return response.status(200).json(data);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};

exports.updatePassword = async (request, response) => {
	const { id, name, groupId, website, username, notes } = request.body;
	const { iv, password } = encrypt(request.body.password);
	const newPassword = {
		id,
		name,
		groupId,
		website,
		username,
		notes,
		iv,
		password,
	};

	try {
		const pass = await Password.findByPk(id);
		await pass
			.update(newPassword)
			.then((resp) => {
				console.log(resp);
				return response.status(200).json(resp);
			})
			.catch((error) => {
				console.log(error);
				return response
					.status(500)
					.json({ error: "Something went wrong." });
			});
	} catch (error) {
		console.log(error);
		return response.status(500).json({ error: error });
	}
};

exports.getPasswords = async (request, response) => {
	const user = response.locals.user;

	try {
		const data = await Password.findAll({
			where: { userId: user.id },
			attributes: { exclude: ["decryptedPassword"] },
		});
		return response.status(200).json(data);
	} catch (error) {
		console.log(error);
		return response.status(500).json({ error: error });
	}
};

exports.getPassword = async (request, response) => {
	try {
		const { id } = request.params;
		const password = await Password.findByPk(id);
		password.decryptedPassword = decrypt({
			iv: password.iv,
			password: password.password,
		});

		return response.status(200).json(password);
	} catch (error) {
		console.log(error);
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
