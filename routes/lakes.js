var express = require("express"),
    router = express.Router({mergeParams: true}),
    Lake = require("../models/lake"),
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
  var newLake = {name: name, image: image};
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

module.exports = router;

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    
     Lake.findById(req.params.id, function(err, foundLake){
            if(err) {
                console.log(err);
            } else {
                //render show template with that lake
                res.render("lakes/show", {lake: foundLake});
            }
        });

});

