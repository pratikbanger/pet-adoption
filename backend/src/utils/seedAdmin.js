const bcrypt = require("bcryptjs");
const { User } = require("../models");

const seedAdmin = async () => {
    const adminEmail = "admin@petadopt.com";

    const existingAdmin = await User.findOne({
        where: { email: adminEmail },
    });

    if (existingAdmin) {
        console.log("ℹ️ Admin already exists");
        return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
    });

    console.log("✅ Admin user created");
};

module.exports = seedAdmin;
