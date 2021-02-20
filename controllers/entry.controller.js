const db = require('../models/index')
const { populate } = require('../models/entry.model')
const { user } = require('../models/index')
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


    //save entry in user model
    User.findById(req.body.creator, (err, user) => {
        if (err) {
            console.log(err)
        }
        user.entries.push(entry._id)
        user.save()
    })
    
    //reading will be on same page as entry get the entryId from body and push into reading field
    entry.readingId = (req.body.readingId)
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
        path: 'readingId',
        model: 'Reading',
        populate: {
            path: 'firstCard secondCard thirdCard',
            model: 'Card'
        }
        })
        .populate({
            path: 'creator',
            model: 'User'
        })
        .then((entry) => {
            if (!entry)
                return res.status(400).send({ message: "Cannot find this entry" })
            else res.send(entry)
        })
}

//edit entry
exports.editEntry = (req, res) => {
    const id = req.body._id
    Entry.updateOne({ _id: id }, {
        body: req.body.body
    }).then((updatedEntry) => {
        if (!updatedEntry)
            return res.status(400).send({ message: "Cannot edit this entry" })
        else res.send(updatedEntry)
    })
}

exports.favorite = (req, res) => {
    const id = req.body._id
    Entry.findById(id, (err, entry) => {
        if (entry.favorite === false) {
            entry.favorite = true
            entry.save()
            User.findByIdAndUpdate(entry.creator, (err, creator) => {
                creator.favorites.push(entry._id)
                creator.save()
            })
        } else {
            entry.favorite = false
            entry.save()
            User.findByIdAndUpdate(entry.creator, (err, creator) => {
                creator.favorites.pull(entry._id)
                creator.save()
            })
        }
    }).then((entry) => {
        if (!entry)
            return res.status(400).send({ message: "Cannot find this entry" })
        else res.send(entry)
    })
}


exports.getEntryByDate = (req,res) => {
    const entryDate = new Date(req.params.date)
    const creator = req.params.creator
    const nextDay = new Date(req.params.date)
    nextDay.setDate(entryDate.getDate() +1)
    Entry.findOne({ date: {$lt: nextDay, $gte: entryDate}, creator: creator})
    .populate({
        path: 'readingId',
        model: 'Reading',
        populate: {
            path: 'firstCard secondCard thirdCard',
            model: 'Card'
        }
    })
    .populate({
        path: 'creator',
        model: 'User'
    })
    .then((entry) => {
        if (!entry)
            return res.status(400).send({ message: "Cannot find this entry" })
        else res.send(entry)
    })
}

exports.getEntryByMonth = (req,res) => {
    const entryDate = new Date(req.params.date)
    entryDate.setDate(1)
    const creator = req.params.creator
    const nextMonth = new Date(req.params.date)
    nextMonth.setMonth(entryDate.getMonth() +1)
    nextMonth.setDate(1)
    Entry.find({ date: {$lt: nextMonth, $gte: entryDate}, creator: creator})
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
            return res.status(400).send({ message: "Cannot find this entry" })
        else res.send(entry)
    })
}