//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
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
        default: []
    },
    
    homeLocation: {
        type: [Number],
        default: undefined
    }
});

module.exports = User = mongoose.model("users", UserSchema);