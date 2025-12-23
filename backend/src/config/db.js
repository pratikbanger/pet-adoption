const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: "postgres",
        port: process.env.PGPORT || 5432,
        logging: false,
        dialectOptions: process.env.PGSSL === "true" ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        } : {},
    }
);

module.exports = sequelize;
