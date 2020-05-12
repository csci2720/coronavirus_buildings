const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Location = require("./Location");
// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favourites: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: Location
    },
    homeLocation: {
        type: [Number],
        default: [0, 0],
        required: true
    }
});

module.exports = User = mongoose.model("users", UserSchema);