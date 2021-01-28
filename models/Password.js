"use strict";
const { Model } = require("sequelize");
const { decrypt } = require("../utils/EncryptionHandler");

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
			encodedPassword: {
				type: DataTypes.VIRTUAL,
				get() {
					const decrypted = decrypt({
						iv: this.iv,
						password: this.password,
					});
					const pass = Array(decrypted.length + 1);
					return pass.join("•");
				},
			},
			decryptedPassword: {
				type: DataTypes.VIRTUAL,
				get() {
					const decrypted = decrypt({
						iv: this.iv,
						password: this.password,
					});

					return decrypted;
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
