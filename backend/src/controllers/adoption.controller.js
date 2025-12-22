const { Adoption, Pet, User } = require("../models");

// USER: Apply for adoption
exports.applyForAdoption = async (req, res) => {
    try {
        const userId = req.user.id;
        const { petId } = req.body;

        if (!petId) {
            return res.status(400).json({ message: "Pet ID is required" });
        }

        const pet = await Pet.findByPk(petId);
        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        if (pet.status === "ADOPTED") {
            return res.status(400).json({ message: "Pet already adopted" });
        }

        const existingApplication = await Adoption.findOne({
            where: { userId, petId },
        });

        if (existingApplication) {
            return res
                .status(400)
                .json({ message: "You already applied for this pet" });
        }

        const adoption = await Adoption.create({
            userId,
            petId,
        });

        res.status(201).json({
            message: "Adoption application submitted",
            adoption,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to apply", error });
    }
};

// USER: View own applications
exports.getMyApplications = async (req, res) => {
    try {
        const userId = req.user.id;

        const applications = await Adoption.findAll({
            where: { userId },
            include: [{ model: Pet }],
            order: [["createdAt", "DESC"]],
        });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch applications", error });
    }
};

// ADMIN: View all applications
exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Adoption.findAll({
            include: [
                { model: User, attributes: ["id", "name", "email"] },
                { model: Pet },
            ],
            order: [["createdAt", "DESC"]],
        });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch applications", error });
    }
};

// ADMIN: Approve / Reject
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["APPROVED", "REJECTED"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const adoption = await Adoption.findByPk(id, {
            include: [{ model: Pet }],
        });

        if (!adoption) {
            return res.status(404).json({ message: "Application not found" });
        }

        adoption.status = status;
        await adoption.save();

        // If approved → mark pet as adopted
        if (status === "APPROVED") {
            adoption.Pet.status = "ADOPTED";
            await adoption.Pet.save();
        }

        res.json({
            message: `Application ${status.toLowerCase()}`,
            adoption,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update status", error });
    }
};
