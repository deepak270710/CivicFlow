const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({

    caseId: String,
    title: String,
    description: String,
    category: String,
    location: String,

    latitude: Number,
    longitude: Number,

    status: {
        type: String,
        default: "Pending"
    },

    photo: String

}, { timestamps: true })  

module.exports = mongoose.model("Location", locationSchema)