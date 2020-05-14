const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
        ref: 'locations',
        default: undefined
    },
    
    homeLocation: {
        type: [Number],
        default: undefined
    }
});

module.exports = User = mongoose.model("users", UserSchema);