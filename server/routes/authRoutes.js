const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")

const User = require("../models/User")

/* REGISTER */

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        const existing = await User.findOne({ email })
        if (existing) {
            return res.json({ message: "User already exists" })
        }
        const hashed = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashed
        })
        await user.save()
        res.json({ message: "Registration successful" })
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})


/* LOGIN */

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: "User not found" })
        }
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            return res.json({ message: "Invalid password" })
        }
        res.json({
            message: "Login successful",
            name: user.name,
            email: user.email
        })
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})
/* GET ALL USERS */

router.get("/users", async (req, res) => {

    try {
        const users = await User.find().select("-password")
        res.json(users)
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})
module.exports = router