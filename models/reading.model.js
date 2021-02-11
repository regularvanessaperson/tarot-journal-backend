const mongoose = require('mongoose')

const Reading = mongoose.model(
    "Reading",
    new mongoose.Schema({
        entryId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}],
        date: Date,
        past: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}],
        present: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}],
        future:[{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}]
    })
)

module.exports = Reading;