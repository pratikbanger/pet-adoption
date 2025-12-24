require("dotenv").config();
const { Sequelize } = require("sequelize");
const db = require("../config/db");
const { Pet } = require("../models");

const samplePets = [
    {
        name: "Buddy",
        species: "Dog",
        breed: "Golden Retriever",
        age: 3,
        description: "Friendly and loves to play.",
        photoUrl: "https://placedog.net/400/300?id=1",
        status: "AVAILABLE",
    },
    {
        name: "Mittens",
        species: "Cat",
        breed: "Siamese",
        age: 2,
        description: "Loves to cuddle.",
        photoUrl: "https://placecats.com/neo_banana/401/301",
        status: "AVAILABLE",
    },
    {
        name: "Charlie",
        species: "Dog",
        breed: "Beagle",
        age: 4,
        description: "Very energetic and curious.",
        photoUrl: "https://placedog.net/400/300?id=2",
        status: "AVAILABLE",
    },
    {
        name: "Luna",
        species: "Cat",
        breed: "Maine Coon",
        age: 1,
        description: "Playful kitten.",
        photoUrl: "https://placecats.com/millie/401/301",
        status: "AVAILABLE",
    },
    {
        name: "Rocky",
        species: "Dog",
        breed: "Bulldog",
        age: 5,
        description: "Calm and loving.",
        photoUrl: "https://placedog.net/400/300?id=3",
        status: "AVAILABLE",
    },
];

const seed = async () => {
    try {
        await db.sync({ force: false });
        await Pet.bulkCreate(samplePets, { ignoreDuplicates: true });
        console.log("Sample pets added successfully!");
        process.exit();
    } catch (err) {
        console.error("Failed to seed pets:", err);
        process.exit(1);
    }
};

seed();
