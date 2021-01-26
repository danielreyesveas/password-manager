"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Password extends Model {
		static associate({ Group }) {
			this.belongsTo(Group, {
				foreignKey: "groupId",
			});
		}
	}
	Password.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			iv: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
			},
			website: {
				type: DataTypes.STRING,
			},
			notes: {
				type: DataTypes.TEXT,
			},
			icon: {
				type: DataTypes.STRING,
			},
			groupId: {
				type: DataTypes.INTEGER,
			},
			ecodedPassword: {
				type: DataTypes.VIRTUAL,
				get() {
					const pass = Array(this.password.length + 1);
					return pass.join("•");
				},
			},
		},
		{
			sequelize,
			modelName: "Password",
			tableName: "passwords",
		}
	);
	return Password;
};
