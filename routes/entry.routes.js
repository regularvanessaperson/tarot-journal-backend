const controller = require('../controllers/entry.controller')

module.exports = function(app) {
    
    app.use((req,res, next)=> {
        //set header and allow use of x access token (we will use this to pass our token)
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
    })

   
    //Post a new entry
    app.post("/api/entry/make", controller.makeEntry)

    //Get a specifict entry
    app.get("/api/entry/:idx", controller.getEntry)


    //Edit any entry
    // app.put("/api/entry/edit", controller.editEntry)

    //Delete any entry
    // app.delete("/api/entry/delete", controller.adminBoard)

    //Change favorite status to True or False
    // app.put("/api/entry/favorite", controller.favorite)

}