const mongoose = require('mongoose')

const Entry = mongoose.model(
    "Entry",
    new mongoose.Schema({
        creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        date: Date,
        body: String,
        readingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reading' },
        favorite: Boolean
    })

)

module.exports = Entry;