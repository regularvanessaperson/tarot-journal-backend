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
    //reading will be on same page as entry get the entryId from body and push into reading field
    reading.entryId.push(req.body.entryId)

    //initialize empty array since axios call pulls 3 random cards per call
    const cards = []

    axios.get("https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=3").then((resp) => {
        // console.log(resp.data.cards)
        resp.data.cards.forEach(card => {
            //each card is pushed into the cards array as a new Card (need to make it so it saves in the Card collection once)
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

    
}