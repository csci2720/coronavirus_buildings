//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const LocationSchema = new Schema({
    district: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        default: undefined
    },
    building: {
        type: String,
        required: true
    },
    relatedCases: {
        type: [Number],
        ref: 'cases',
        default: undefined
    },
    lastVisitDate: {
        type: Date,
        default: undefined
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'comments',
        default: undefined
    }

});

module.exports = Location = mongoose.model("locations", LocationSchema);
