const mongoose = require('mongoose')

const Cards = mongoose.model(
    "Cards",
    new mongoose.Schema({
        name: String,
        image: String,
        description: String,
        meaning: String
    })
)

module.exports = Cards;