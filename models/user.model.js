const mongoose = require("mongoose")

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        entries: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}],
        favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}],
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
)

module.exports = User