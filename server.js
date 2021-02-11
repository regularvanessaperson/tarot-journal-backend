const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./config/db.config')
const cors = require('cors')



const app= express()

require('dotenv').config()

app.use(cors())

//parse requests of content-type - application/json
app.use(bodyParser.json())

//parse request of content type = application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))


//SETUP MONGOOSE
const db = require('./models/index')
const Role = db.role

//connecting to our backend
db.mongoose
.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
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
// require('/routes/entry.routes')(app)
// require('/routes/reading.routes')(app)
// require('/routes/cards.routes')(app)

//set prot, listen for request
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})


function initial(){
    Role.estimatedDocumentCount((err, count)=>{
        //if no roles are present, create our new roles( admin and user)
        if (!err && count === 0){
            new Role({
                name: 'user'
            }).save(err=>{
                if(err) {
                    console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}