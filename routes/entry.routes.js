const controller = require('../controllers/entry.controller')

module.exports = function (app) {

    app.use((req, res, next) => {
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

    //get entry on a specific day
    app.get("/api/entry/date/:date/creator/:creator", controller.getEntryByDate)

    //get entry on a specific month
    app.get("/api/entry/month/:date/creator/:creator", controller.getEntryByMonth)

    //Edit any entry
    app.put("/api/entry/edit", controller.editEntry)

    //Change favorite status to True or False
    app.put("/api/entry/favorite", controller.favorite)

    //Delete any entry
    app.delete("/api/entry/delete", controller.deleteEntry)

}