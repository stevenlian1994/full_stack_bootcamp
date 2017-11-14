//REQUIRE PACKAGES
var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    flash = require("connect-flash"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    Lake = require("./models/lake"),
    methodOverride = require("method-override");
    
var moment = require("moment-timezone");
    

    
    
//REQUIRE ROUTES
var commentRoutes = require("./routes/comments");
var lakeRoutes = require("./routes/lakes");
var indexRoutes = require("./routes/index");

console.log(process.env.DATABASEURL);

// //DB CONFIGURATION
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/yelp_lakes_practice", {useMongoClient: true});
// // console.log(process.env.DATABASEURL)
mongoose.connect(process.env.DATABASEURL);

// // process.env.DATABASEURL || 
//     // process.env.MONGODB_URI
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://stevenlian1994:Aslasym4@ds062448.mlab.com:62448/yelpcamp", {useMongoClient: true});

// const databaseUri = process.env.mongodb://<steven>:<lian>@ds062448.mlab.com:62448/yelpcamp
// mongoose.connect(databaseUri, { useMongoClient: true })
//       .then(() => console.log(`Database connected!`))
//       .catch(err => console.log(`Database connection error: ${err.message}`));

//APP CONFIGURATION
app.use(express.static(__dirname + '/public/stylesheets'));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(flash());
app.use(methodOverride("_method")); 



//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty cutest",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//app.locals: Application local variables are provided to all templates rendered within the application.
//This is useful for providing helper functions to templates, as well as app-level data.

//res.locals An object that contains response local variables scoped to the request, 
//and therefore available only to the view(s) rendered during that request / response cycle (if any). 
// Otherwise, this property is identical to app.locals

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use("/", indexRoutes);
app.use("/lakes", lakeRoutes);
app.use("/lakes/:id/comments", commentRoutes);


//START SERVER
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpLakes has started!");
});