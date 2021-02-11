const mongoose = require('mongoose')

const Entry = mongoose.model(
    "Entry",
    new mongoose.Schema({
        creator: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        date: Date,
        body: String,
        reading: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reading'}],
        favorites: Boolean
    })
)

module.exports = Entry;