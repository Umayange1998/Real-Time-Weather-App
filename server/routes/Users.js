const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secrettoken";

const { Users } = require("../models");

// Register a new user
router.post("/", async (req, res) => {
  try {
    const { email, firstName, lastName, password, role } = req.body;

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "You already have an account on this email" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      email,
      first_Name: firstName,
      last_Name: lastName,
      password: hashpassword,
      role,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.log("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Check if email already exists
router.get("/email-check/:email", async (req, res) => {
  try {
    const existingUser = await Users.findOne({ where: { email: req.params.email } });
    if (existingUser) {
      return res.status(200).json({ exists: true });
    }
    res.status(200).json({ exists: false });
  } catch (err) {
    console.error("Email check error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

const user = await Users.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ error: "User Dosent Exists" });
  }

  bcrypt
    .compare(password, user.password)
    .then((match) => {
      if (!match) {
        return res
          .status(401)
          .json({ error: "Wrong Username and Password Combination" });
      }

      const accessToken = jwt.sign(
        { email: user.email, id: user.id, role: user.role },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Login successful",
        token: accessToken,
        user: { id: user._id, email: user.email, role: user.role },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});


//delete user
router.delete("/:id", async (req, res) => {
  try {
    const deletedCount = await Users.destroy({ where: { id: req.params.id } });

if (deletedCount === 0) {
  return res.status(404).json({ message: "User not found" });
}

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ["password"] }, // exclude the password field
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
});

module.exports = router;
