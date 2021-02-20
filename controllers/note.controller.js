
const db = require('../models/index')
const { populate } = require('../models/note.model')
//Access to our db 
const User = db.user
const Note = db.note


exports.makeNote = (req, res) => {
    //creating note object
    const note = new Note({
        creator: req.body.creator,
        body: req.body.body,
        date: new Date
    })

    //Save the new note
    note.save((err) => {
        if (err) {
            res.status(500).send({ message: err })
        }
        res.send(note)
    })
}

//edit note
exports.editNote = (req, res) => {
    const id = req.body._id
    Note.updateOne({ _id: id }, {
        body: req.body.body
    }).then((updatedNote) => {
        if (!updatedNote)
            return res.status(400).send({ message: "Cannot edit this note" })
        else res.send(updatedNote)
    })
}

//delete note 
exports.deleteNote = (req, res) => {
    const id = req.body._id
    Note.findByIdAndDelete({ _id: id })
        .then((data) => {
            if (!data)
                return res.status(400).send({ message: "Unable to delete note" })
            else res.send("Note successfully deleted")
        })


}