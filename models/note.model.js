const mongoose = require('mongoose')

const Note = mongoose.model(
    "Note",
    new mongoose.Schema({
        creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        date: Date,
        body: String
    })

)

module.exports = Note;