const sequelize = require("../config/db");

const User = require("./user.model");
const Pet = require("./pet.model");
const Adoption = require("./adoption.model");

User.hasMany(Adoption, { foreignKey: "userId" });
Adoption.belongsTo(User, { foreignKey: "userId" });

Pet.hasMany(Adoption, { foreignKey: "petId" });
Adoption.belongsTo(Pet, { foreignKey: "petId" });

module.exports = {
    sequelize,
    User,
    Pet,
    Adoption,
};
