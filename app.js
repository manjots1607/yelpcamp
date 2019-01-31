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
               seedDB = require("./seed");
  
  seedDB();
   
   
 mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true});


app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(require("express-session")({
    secret:"Dogs are cute",
    resave:false,
    saveUninitialized:false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.curUser=req.user;
    next();
});

// Campground.create(
//     {
//                 name:"marwari camps",
//                 image:"http://www.rajasthanvisit.com/Images/CAMPING4.jpg",
//                 description:"get the feeling of royal camps alongwith dunes of dessert. We have allbasic facilities available such as water."
                
//     },
//     function(err,newCampground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("New campground added: ");
//             console.log(newCampground);
//         }
//     });

// var campgrounds=[
//             {
//                 name:"sharmas leh camp",
//                 image:"https://5.imimg.com/data5/GG/GG/GLADMIN-/rajasthan-desert-tour-500x500.jpg"
//             },
//             {
//                 name:"Solang campground",
//                 image:"http://www.rajasthanvisit.com/Images/CAMPING4.jpg"
//             },
//             {
//                 name:"pangong camps",
//                 image:"http://www.rajasthanvisit.com/Images/CAMPING4.jpg"
//             }
//         ];



//======================ROUTES===========================================================

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    console.log(req.user);
   Campground.find({},function(err,allCampgrounds){
       if(err){
           console.log("Something went wrong");
           console.log(err);
       }else{
           res.render("campgrounds",{campgrounds:allCampgrounds,curUser:req.user});
           
       }
   })
    
});

app.post("/campgrounds",function(req,res){
    
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.desc;
    var newCampground={name:name,image:image,description:desc};
    Campground.create(newCampground,function(err,newCampground){
        if(err){
            console.log("Something went wrong");
        }else{
            res.redirect("/campgrounds");
        }
    })
    
    
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.get("/campgrounds/:id",function(req,res){
    var id=req.params.id;
    Campground.findById(id).populate("comments").exec(function(err,showcamp){
        if(err){
            console.log("something went wrong");
            console.log(err);
            res.redirect("/campgrounds");
            
        }else{
           
            
            res.render("show",{campground:showcamp});
            
            
        }
    });
    
});




app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
            
        }else{
            res.render("comments/new",{campground:campground}); 
        }
    });
   
});

app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
   Campground.findById(req.params.id,function(err, campground) {
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           Comment.create(req.body.comment,function(er,comment){
               if(er){
                   console.log(er);
                   res.redirect("/campgrounds");
               }else{
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/"+req.params.id);
               }
           });
       }
   }); 
});


//================AUTH ROUTES==========================
app.get("/register",function(req, res) {
    res.render("register");
});
app.post("/register",function(req, res) {
    User.register(new User({username: req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
        console.log(user);
    });
});

app.get("/login",function(req, res) {
    res.render("login");
});
app.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){
    
})

app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp app started");
});