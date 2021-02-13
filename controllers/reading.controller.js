const db = require('../models/index')
const axios = require('axios')
//Access to our db thorugh User and Role variable
const User = db.user
const Card = db.card
const Reading = db.reading


//save the three cards that were generated from the API and save the three entrys 
exports.generateReading = (req, res) => {
    const reading = new Reading({
        // entryId: req.body.entryId,
        date: new Date()
    })
    const cards = []

    axios.get("https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=3").then((resp) => {
        // console.log(resp.data.cards)
        resp.data.cards.forEach(card => {
            cards.push(new Card({
                name: card.name,
                image: `https://www.sacred-texts.com/tarot/pkt/img/${card.name_short}.jpg`,
                description: card.desc,
                meaning: card.meaning_up
            }))
        })
        console.log("this is the current " + cards.length)

        cards[0].save((err, updated) => {

            console.log('Card Saved!', updated._id, cards[0]._id)
        })
        cards[1].save((err) => {
            console.log('Card Saved!', cards[1]._id)
        })
        cards[2].save((err) => {
            console.log('Card Saved!', cards[2]._id)
        })
        // res.send(cards)
    }).then(() => {
        reading.firstCard = cards[0]
        reading.secondCard = cards[1]
        reading.thirdCard = cards[2]
        reading.save((err) => {
            console.log(err)
        })
        res.send(reading)
    }).catch(error => {
        console.log("error", error)
    })

    // Reading.findById(reading._id, { $push: { 
    //     firstCard: cards[0]._id,
    //     secondCard: cards[1]._id,
    //     thirdCard: cards[2]._id
    //  } }, (err, readingCards) => {
    //     if (err) {
    //         res.status(500).send({ message: err })
    //         return
    //     }
    //     res.send(reading)

    // }).populate('firstCard', 'secondCard', 'thirdCard')

    // reading.firstCard = cards[0]._id
    // reading.secondCard = cards[1]._id
    // reading.thirdCard = cards[2]._id


    // Reading.findById(reading._id, (err) => {
    //     if (err) {
    //         res.status(500).send({ message: err })
    //         return
    //     }
    //     reading.firstCard.push(cards[0]._id)
    //     reading.secondCard.push(cards[1]._id)
    //     reading.thirdCard.push(cards[2]._id)
    //     // reading.save((err) => {
    //     //     if (err) {
    //     //         res.status(500).send({ message: err })
    //     //     }
    //         res.send(reading)
    //     // })


    // })
}
