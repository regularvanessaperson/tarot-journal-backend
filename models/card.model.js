const mongoose = require('mongoose')

const Card = mongoose.model(
    "Card",
    new mongoose.Schema({
        name: String,
        image: String,
        description: String,
        meaning: String,
    })
)

module.exports = Card;