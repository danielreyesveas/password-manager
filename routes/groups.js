const { Group } = require("../models");

exports.getGroups = async (request, response) => {
	const user = response.locals.user;

	try {
		const data = await Group.findAll({ where: { userId: user.id } });
		return response.status(200).json(data);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};

exports.addGroup = async (request, response) => {
	const user = response.locals.user;
	const { name } = request.body;

	try {
		const data = await Group.create({
			name,
			userId: user.id,
		});
		return response.status(200).json(data);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};

exports.updateGroup = async (request, response) => {
	const { id, name } = request.body;

	try {
		const group = await Group.findByPk(id);
		if (!group)
			return response.status(404).json({ error: "Group not found." });

		group.name = name;
		await group.save();

		return response.status(200).json(group);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};
