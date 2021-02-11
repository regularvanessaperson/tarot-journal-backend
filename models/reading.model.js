const mongoose = require('mongoose')

const Reading = mongoose.model(
    "Reading",
    new mongoose.Schema({
        entryId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}],
        date: Date,
        firstCard: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}],
        secondCard: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}],
        thirdCard:[{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}]
    })
)

module.exports = Reading;