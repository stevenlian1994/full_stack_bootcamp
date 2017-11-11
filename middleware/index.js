var middlewareObj = {};
var lake = require("../models/lake");
var Comment = require("../models/comment");

middlewareObj.checklakeOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        lake.findById(req.params.id, function(err, foundlake){
            if(err || !foundlake){
                req.flash("error", "lake not found");
                res.redirect("/lakes");
            } else {
                if(foundlake.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
        }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err || !foundComment){
            req.flash("error", "Comment not found");
            res.redirect("back");
        } else {
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
            }
        });
    } else {
        res.redirect("back");
    }
}

//middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}




module.exports = middlewareObj;