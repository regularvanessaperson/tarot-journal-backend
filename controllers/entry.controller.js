const db = require('../models/index')
const { populate } = require('../models/entry.model')
//Access to our db 
const User = db.user
const Reading = db.reading
const Entry = db.entry


exports.makeEntry = (req, res) => {
    const entry = new Entry({
        date: new Date(),
        body: req.body.body,
        // readingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reading' },
        favorite: false
    })

    //Reference the user as the creator of the new post
    entry.creator.push(req.body.creator)

    //reading will be on same page as entry get the entryId from body and push into reading field
    entry.readingId.push(req.body.readingId)

    //save entry in user model
    User.findById(req.body.creator, (err, user) => {
        if (err) {
            console.log(err)
        }
        user.entries.push(entry._id)
        user.save()
    })

    //save entry
    entry.save(err => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        res.send(entry)
    })
}

//route to display one post only "/api/posts/:id"
exports.getEntry = (req, res) => {
    const id = req.params.idx
    Entry.findOne({ _id: id })
        .populate({
            path: 'reading',
            model: 'Entry',
            populate: {
                path: 'firstCard',
                model: 'Card',
            },
            populate: {
                path: 'secondCard',
                model: 'Card',
            },
            populate: {
                path: 'thirdCard',
                model: 'Card',
            }
        })
        .populate({
             path: 'creator',
                model: 'User'
        })
        .then((entry) => {
            if (!entry)
                return res.status(400).send({ message: "Cannot find this post" })
            else res.send(entry)
        })
}


