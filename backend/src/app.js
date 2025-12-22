const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth.routes");
const petRoutes = require("./routes/pet.routes");
const adoptionRoutes = require("./routes/adoption.routes");
const errorHandler = require("./middlewares/error.middleware");
const rateLimiter = require("./middlewares/rateLimit.middleware");

app.use(rateLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/adoptions", adoptionRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Pet Adoption API is running 🚀" });
});

app.use(errorHandler);

module.exports = app;
