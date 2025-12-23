const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
            name: user.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
};

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "USER",
        });

        const token = generateToken(user);

        res.status(201).json({
            message: "User registered successfully",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);

        res.json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error });
    }
};
