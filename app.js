var          express  = require("express"),
                 app  = express(),
          bodyparser  = require("body-parser"),
            passport  = require("passport"),
       localStrategy  = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
                 User = require("./models/user.js"),
             mongoose = require("mongoose"),
           Campground = require("./models/campground"),
              Comment = require("./models/comment"),
               seedDB = require("./seed"),
      methodOverridde = require("method-override");
  
//   seedDB(); 
  
var campgroundRoutes=require("./routes/campgrounds.js");
var commentRoutes=require("./routes/comments");
var indexRoutes=require("./routes/index");

   
   
 mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true});


app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(require("express-session")({
    secret:"Dogs are cute",
    resave:false,
    saveUninitialized:false
}));

app.use(methodOverridde("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.curUser=req.user;
    next();
});

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",indexRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp app started");
});