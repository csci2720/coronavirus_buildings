const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Case = require("./Case");

// Create Schema
const LocationSchema = new Schema({
    district: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true,
        default: undefined
    },
    building: {
        type: String,
        required: true
    },
    relatedCases: {
        type: [Number],
        required: true,
        default: undefined
    },
    lastVisitDate: {
        type: Date,
        default: undefined
    }

});

module.exports = Location = mongoose.model("locations", LocationSchema);