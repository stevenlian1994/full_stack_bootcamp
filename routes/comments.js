var express = require("express");
var router = express.Router({mergeParams: true});
var Lake = require("../models/lake");
var Comment = require("../models/comment");
var middleware = require("../middleware");


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

//COMMENT EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {lake_id: req.params.id, comment: foundComment});
        }
    });
});

//COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/lakes/" + req.params.id)
       }
    });
});


//COMMENT DESTORY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   //findByIdAndRemove
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
          res.redirect("/lakes/" + req.params.id); 
       }
   });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;