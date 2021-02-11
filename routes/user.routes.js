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

    app.get("/api/user/profile/:id", controller.userProfile)

    //Get array of favorite posts (debatable if I need this field on the user should I just filter the if favorite = ture on the frontend to display)
    app.get("/api/user/favorites", controller.favorites)

}