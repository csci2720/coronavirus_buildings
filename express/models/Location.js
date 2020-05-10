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
        default: [0, 0]
    },
    buildingName: {
        type: String,
        required: true
    },
    relatedCases: {
        type: [Schema.Types.ObjectId],
        ref: Case,
        required: true
    }

});

module.exports = Location = mongoose.model("locations", LocationSchema);