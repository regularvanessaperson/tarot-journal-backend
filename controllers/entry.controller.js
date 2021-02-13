const db = require('../models/index')
const { populate } = require('../models/user.model')
//Access to our db thorugh User and Role variable
const User = db.user
const Card = db.card