const express = require("express")
const cors = require("cors")
const path = require("path")

const connectDB = require("./config/db")
const locationRoutes = require("./routes/locationRoutes")
const authRoutes = require("./routes/authRoutes")

const User = require("./models/User")
const Location = require("./models/Location")

const app = express()

// Connect MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// API routes
app.use("/api/location", locationRoutes)
app.use("/api/auth", authRoutes)

// Reset database route (optional)
app.get("/reset-db", async (req, res) => {

    await User.deleteMany({})
    await Location.deleteMany({})

    res.send("Database cleared")

})

// Get complaint by caseId
app.get("/api/complaints/:caseId", async (req, res) => {

    try {

        const complaint = await Location.findOne({ caseId: req.params.caseId })

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" })
        }

        res.json({
            caseId: complaint.caseId,
            title: complaint.title,
            description: complaint.description,
            category: complaint.category,
            location: complaint.latitude + "," + complaint.longitude,
            status: complaint.status,
            photo: "/uploads/" + complaint.photo,
            createdAt: complaint.createdAt
        })

    } catch (error) {

        res.status(500).json({ error: error.message })

    }

})


// Serve frontend
app.use(express.static(path.join(__dirname, "../client")))

// Important for deployment (SPA routing)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"))
})

// Use Render port
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})