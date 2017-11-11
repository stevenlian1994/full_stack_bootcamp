var express = require("express"),
    router = express.Router();
    
var passport = require("passport");
var User = require("../models/user");

//ROOT ROUTE
router.get("/", function(req, res){
  res.render("landing");
});

//SIGNUP 
router.get("/register", function(req, res){
   res.render("register"); 
});

router.post("/register", function(req, res){
    // var newUserName = req.body.username
    var newUser = new User({username: req.body.username});
        
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render("register");
            } else {
                passport.authenticate("local")(req, res, function(){
                    req.flash("success", "Thanks for signing up, nice to meet you " + newUser.username);
                    res.redirect("/lakes");
                });
            }
        });
    
   

});

//LOGIN

router.get("/login", function(req, res){
    res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/lakes",
        failureRedirect: "/login"
    }), function(req, res){
    
});

//logic route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/lakes");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// function passwordAuthenticated(req, res, next){
//     if (schema.validate(req.body.password)) {
//         return next();
//     }
//     else {
//         res.redirect("/register");
//     }
// }



module.exports = router;