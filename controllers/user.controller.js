const User = require("../models/user.model")

exports.allAccess = (req, res)=>{
    res.status(200).send("public content")
}

exports.userBoard = (req, res) => {
    res.status(200).send("User content")
}

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin content")
}

exports.userProfile = (req,res) => {
    User.findById(req.params.idx).
    populate('favorites').
    exec((err, user) => {
        if(err){
            res.status(400).send({message: "User profile not found"})
        } else {
            res.send(user)
        }
    })
}

exports.feed = (req,res) =>{
    User.findById(req.params.idx).
    populate('entries').
    exec((err, user) => {
        if(err){
            res.status(400).send({message: "User feed not found"})
        } else {
            res.send(user)
        }
    })
}


