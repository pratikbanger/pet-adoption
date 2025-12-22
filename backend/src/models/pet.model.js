const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pet = sequelize.define(
    "Pet",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        species: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        breed: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
        },

        photoUrl: {
            type: DataTypes.STRING,
        },

        status: {
            type: DataTypes.ENUM("AVAILABLE", "ADOPTED"),
            defaultValue: "AVAILABLE",
        },
    },
    {
        tableName: "pets",
        timestamps: true,
    }
);

module.exports = Pet;
