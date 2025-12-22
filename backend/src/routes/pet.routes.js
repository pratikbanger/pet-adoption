const express = require("express");
const router = express.Router();

const petController = require("../controllers/pet.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

// Public routes
router.get("/", petController.getPets);
router.get("/:id", petController.getPetById);

// Admin routes
router.post("/", verifyToken, allowRoles("ADMIN"), petController.createPet);
router.put("/:id", verifyToken, allowRoles("ADMIN"), petController.updatePet);
router.delete("/:id", verifyToken, allowRoles("ADMIN"), petController.deletePet);

module.exports = router;
