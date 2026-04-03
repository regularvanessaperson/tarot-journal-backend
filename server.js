const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./config/db.config')
const cors = require('cors')
const path = require('path')




const app= express()

require('dotenv').config()

app.use(cors())

//parse requests of content-type - application/json
app.use(bodyParser.json())

//parse request of content type = application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))


//SETUP MONGOOSE
const db = require('./models/index')
const Role = db.role
const dbURI = process.env.MONGODB_URI || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`

//connecting to our backend
db.mongoose
.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Sucessfully connected to MongoDB")
    initial()
})
.catch(err =>{
    console.error("connection error", err)
    process.exit()
})


//simple route, do I work?
app.get('/', (req, res)=> {
    res.json({message: "Welcome to the home page"})

})

//import routes we wrote
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/card.routes')(app)
require('./routes/entry.routes')(app)
require('./routes/reading.routes')(app)
require('./routes/note.routes')(app)


//set prot, listen for request
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})


async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    // if no roles are present, create our new roles (admin and user)
    if (count === 0) {
      try {
        await new Role({ name: 'user' }).save();
        console.log("added 'user' to roles collection");
      } catch (err) {
        console.log("error", err);
      }
      try {
        await new Role({ name: 'admin' }).save();
        console.log("added 'admin' to roles collection");
      } catch (err) {
        console.log("error", err);
      }
    }
  } catch (err) {
    console.log("error", err);
  }
}