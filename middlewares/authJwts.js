const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models/index')
const User = db.user
const Role = db.role

//function will verify our web token
verifyWebToken = (req,res,next)=> {
    //first we declare our token which is passed in our headers
    let token = req.headers['x-access-token']
    //If not token given we respond with an error
    if(!token){
        return res.status(403).send({message: "No token provided"})
    }
    //jwt will try to veirfy the token
    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({message: "Unauthorized"})
        }
        //set userid ot decoded id
        req.userId = decoded.id
        next()
    })
}

//Another function to verify if admin or not
isAdmin = (req,res,next)=> {
    //.exec returns the user we want to have access to (unlike .then)
    User.findOne({_id: req.userId}).exec((err, user)=>{
        if (err) {
            //error for user that doesn't exist
            return res.status(500).send({message: err})
        }
        //find users role if user exists
        Role.find({
           _id: {$in: user.roles}
        }, (err, roles)=>{
            if (err){
               return res.status(500).send({message: err})
            }
            //loop through returned roles and check if theres a admin role
            for (let i=0; i < roles.length; i++){
                if(roles[i].name ==='admin'){
                    next()
                    return 
                }
            }
            res.status(403).send({message: 'Requires admin Role'})
        })
    })
}


const authJwt = {
    verifyWebToken,
    isAdmin
}

module.exports = authJwt