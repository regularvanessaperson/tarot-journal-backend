const {verifySignup} = require('../middlewares')
const controller = require('../controllers/auth.controller');
// const { checkDuplicateUsernameOrEmail } = require('../middlewares/verifySignup');

module.exports = function(app) {
    
    app.use((req,res, next)=> {
        //set header and allow use of x access token (we will use this to pass our token)
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
    })
    //set up signup rote and pass middlewares to check username, email and roles
    app.post("/api/auth/signup",
    [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
    controller.signup)
    //handle sign in
    app.post("/api/auth/signin", controller.signin)
}