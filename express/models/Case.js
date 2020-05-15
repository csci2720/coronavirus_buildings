//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
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
    }
    
});

module.exports = Case = mongoose.model("cases", CaseSchema);