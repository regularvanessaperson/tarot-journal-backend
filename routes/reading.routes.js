const controller = require('../controllers/reading.controller')

module.exports = function(app) {
    
    app.use((req,res, next)=> {
        //set header and allow use of x access token (we will use this to pass our token)
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
    })
    
    //The cards should populate the first second and third card fields 
    app.post("/api/reading", controller.generateReading)

    //This generates a five card reading
    app.post("/api/five/reading", controller.generateFiveReading)

    //Get the reading associated with readingId
    app.get("/api/reading/:idx", controller.getReading)
}