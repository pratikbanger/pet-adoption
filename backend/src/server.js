const app = require("./app");
const sequelize = require("./config/db");
require("./models");
require("dotenv").config();

const seedAdmin = require("./utils/seedAdmin");

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected");

        await sequelize.sync({ alter: true });
        console.log("✅ Models synced");

        await seedAdmin();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ DB connection failed:", error);
    }
})();
