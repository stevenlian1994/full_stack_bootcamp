var express = require("express");
var router = express.Router({mergeParams: true});
var Lake = require("../models/lake")
var Comment = require("../models/comment")


//Comments New
router.get("/new", isLoggedIn, function(req, res){
    Lake.findById(req.params.id, function(err, lake){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {lake: lake});
        }
    })
});

//Comments Create
router.post("/", isLoggedIn, function(req, res){
 
   Lake.findById(req.params.id, function(err, lake){
       if(err){
           console.log(err);
           res.redirect("/lakes");
       } else {
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                   //add username and id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   console.log("New comment's username will be: " + req.user.username);
                   //save comment
                   comment.save();
                   lake.comments.push(comment);
                   lake.save();
                   console.log(comment);
                   res.redirect("/lakes/" + lake._id);
               }
           });
           
       }
   })
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;