const express = require("express")
const router = express.Router()
const multer = require("multer")

const Location = require("../models/Location")

// Storage config
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }

})
const upload = multer({ storage: storage })
// POST location + image
router.post("/", upload.single("photo"), async (req, res) => {
    try {
        const { title, description, category, location, latitude, longitude } = req.body
        const caseId = "CASE-" + Date.now()
        const newLocation = new Location({
            caseId,
            title,
            description,
            category,
            location,
            latitude,
            longitude,
            photo: req.file.filename
        })
        await newLocation.save()
        const imagePath = "/uploads/" + req.file.filename

        res.json({
            message: "Report submitted successfully",
            image: imagePath,
            caseId: caseId
        })
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
})

// GET reports
// GET all complaints
router.get("/", async (req, res) => {

    try {
        const complaints = await Location.find().sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

router.put("/:id", async (req, res) => {

    try {
        const { status } = req.body
        await Location.findByIdAndUpdate(req.params.id, { status })
        res.json({ message: "Status updated" })
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
})
module.exports = router
