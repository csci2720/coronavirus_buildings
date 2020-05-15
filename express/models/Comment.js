//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    text: {
        type: String,
        default: "",
        required: true
    },
    
    location: {
        type: Schema.Types.ObjectId,
        ref: 'locations',
        required: true
    }

});

module.exports = Comment = mongoose.model("comments", CommentSchema);