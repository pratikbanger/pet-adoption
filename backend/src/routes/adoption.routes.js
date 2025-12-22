const express = require("express");
const router = express.Router();

const adoptionController = require("../controllers/adoption.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

// User routes
router.post(
    "/apply",
    verifyToken,
    allowRoles("USER"),
    adoptionController.applyForAdoption
);

router.get(
    "/my",
    verifyToken,
    allowRoles("USER"),
    adoptionController.getMyApplications
);

// Admin routes
router.get(
    "/",
    verifyToken,
    allowRoles("ADMIN"),
    adoptionController.getAllApplications
);

router.put(
    "/:id",
    verifyToken,
    allowRoles("ADMIN"),
    adoptionController.updateApplicationStatus
);

module.exports = router;
