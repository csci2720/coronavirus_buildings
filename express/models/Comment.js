const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./User");
const Location = require("./Location");
// Create Schema
const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    text: {
        type: String,
        default: "",
        required: true
    },
    /*
    location: {
        type: Schema.Types.ObjectId,
        ref: Location,
        required: true
    }
*/
});

module.exports = Comment = mongoose.model("comments", CommentSchema);