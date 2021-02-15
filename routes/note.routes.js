const controller = require('../controllers/note.controller')

module.exports = function(app) {
    
    app.use((req,res, next)=> {
        //set header and allow use of x access token (we will use this to pass our token)
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
    })

   
    //Post a new note
    app.post("/api/note", controller.makeNote)

    //Get month of notes
    // app.get("/api/note/month", controller.getEntry)


    //Edit any entry
    app.put("/api/note/edit", controller.editNote)

    //Delete any entry
    app.delete("/api/note/delete", controller.deleteNote)


}