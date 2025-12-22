const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Adoption = sequelize.define(
    "Adoption",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        status: {
            type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
            defaultValue: "PENDING",
        },
    },
    {
        tableName: "adoptions",
        timestamps: true,
    }
);

module.exports = Adoption;
