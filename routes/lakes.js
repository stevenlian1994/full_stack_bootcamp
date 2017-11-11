var express = require("express"),
    router = express.Router({mergeParams: true}),
    Lake = require("../models/lake"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");
    


//INDEX ROUTE
router.get("/", function(req, res){
    Lake.find({}, function(err, foundLakes){
        if(err) {
            console.log(err);
        } else {
            res.render("lakes/index", {lakes: foundLakes});
        }
    });
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newLake = {name: name, image: image, description: description};
  Lake.create(newLake, function(err, newlyCreated){
      if(err){
            console.log(err);
      } else {
            res.redirect("/lakes");
      }
  });
});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("lakes/new"); 
});



//SHOW ROUTE - shows more info about one lake, has path parameter inside the route -> the id, 
router.get("/:id", function(req, res){
    //find the lake with provided ID 
    Lake.findById(req.params.id).populate("comments").exec(function(err, foundlake){
        if(err || !foundlake) {
            req.flash("error", "lake not found");
            res.redirect("back");
            console.log(err);
        } else {
            console.log(foundlake);
            //render show template with that lake
            res.render("lakes/show", {lake: foundlake});
        }
    });
});


// //EDIT CAMPGROUND ROUTE
// router.get("/:id/edit", middleware.checkLakeOwnership, function(req, res){
//         Lake.findById(req.params.id, function(err, foundLake){
//             if(err){
//                 console.log(err);
//             } else {
//                 res.render("lakes/edit", {lake: foundLake});
//             }
//         });
// });

// //UPDATE CAMPGROUND ROUTE
// router.put("/:id", middleware.checkLakeOwnership, function(req, res){
//     //find and update the correct lake
//     //mongoose's method 
//     Lake.findByIdAndUpdate(req.params.id, req.body.lake, function(err, updatedLake){
//         if(err){
//             res.redirect("/lakes");
//         } else {
//             res.redirect("/lakes/" + req.params.id);
//         }
//     });
//     //redirect somewhere(show page)
    
    
// });

// //DESTROY CAMPGROUND ROUTE
// router.delete("/:id",middleware.checkLakeOwnership, function(req, res){
//     Lake.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/lakes");
//         } else {
//             res.redirect("/lakes");
//         }
//     })
// });

module.exports = router;
