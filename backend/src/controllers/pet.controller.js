const { Op } = require("sequelize");
const { Pet } = require("../models");
const { isEmpty } = require("../utils/validate");

exports.getPets = async (req, res) => {
    try {
        const {
            search,
            species,
            breed,
            minAge,
            maxAge,
            page = 1,
            limit = 8,
        } = req.query;

        const where = {
            status: "AVAILABLE",
        };

        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { breed: { [Op.like]: `%${search}%` } },
            ];
        }

        if (species) where.species = species;
        if (breed) where.breed = breed;

        if (minAge || maxAge) {
            where.age = {};
            if (minAge) where.age[Op.gte] = minAge;
            if (maxAge) where.age[Op.lte] = maxAge;
        }

        const offset = (page - 1) * limit;

        const { rows, count } = await Pet.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["createdAt", "DESC"]],
        });

        res.json({
            data: rows,
            pagination: {
                total: count,
                page: Number(page),
                pages: Math.ceil(count / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch pets", error });
    }
};

exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id);

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        res.json(pet);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch pet", error });
    }
};

exports.createPet = async (req, res) => {
    try {
        const { name, species, breed, age } = req.body;

        if ([name, species, breed, age].some(isEmpty)) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const pet = await Pet.create(req.body);
        res.status(201).json(pet);
    } catch (error) {
        console.log("🚀 ~ error:", error)
        res.status(400).json({ message: "Failed to create pet", error });
    }
};

exports.updatePet = async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        await pet.update(req.body);
        res.json(pet);
    } catch (error) {
        res.status(400).json({ message: "Failed to update pet", error });
    }
};

exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        await pet.destroy();
        res.json({ message: "Pet deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete pet", error });
    }
};
