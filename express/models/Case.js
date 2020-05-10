const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CaseSchema = new Schema({
    caseNum: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    residency: {
        type: String,
        required: true
        // HK resident/Non-HK resident
    },
    classification: {
        type: String,
        required: true
        // Close contact of imported case
        // Close contact of local case
        // Close contact of possibly local
        // Imported
        // Local case with unknown source
        // Possibly local
        // Imported case
        // Possibly local case
        // Local case
        // Epidemiologically linked with imported case
        // Epidemiologically linked with possibly local case
        // Epidemiologically linked with local case
    },
    confirmationStatus: {
        type: String,
        required: true
        // Confirmed/probable
    }
});

module.exports = Case = mongoose.model("cases", CaseSchema);