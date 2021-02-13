const {authJwt} = require('../middlewares')
const controller = require('../controllers/user.controller')

module.exports = function(app) {
    
    app.use((req,res, next)=> {
        //set header and allow use of x access token (we will use this to pass our token)
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
    })
    
    app.get("/api/test/all", controller.allAccess)
   
    app.get("/api/test/user", [authJwt.verifyWebToken], controller.userBoard)

    app.get("/api/test/admin", [authJwt.verifyWebToken, authJwt.isAdmin], controller.adminBoard)

    // display user profile and also populates favorites since they will display on the profile page on frontend
    app.get("/api/user/profile/:idx", controller.userProfile)

    //Get all user entrys for feed
    app.get("/api/user/entry/feed/:idx", controller.feed)

}