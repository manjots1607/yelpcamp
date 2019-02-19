var express=require("express");
var router=express.Router();
var Campground=require("../models/campground.js");
var User=require("../models/user.js");
var passport=require("passport");

router.get("/",function(req,res){
    res.render("landing");
});

//================AUTH ROUTES==========================
router.get("/register",function(req, res) {
    res.render("register");
});
router.post("/register",function(req, res) {
    User.register(new User({username: req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            req.flash("error",err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","You registered Successfully!!");
            res.redirect("/campgrounds");
        });
        console.log(user);
    });
});

router.get("/login",function(req, res) {
    res.render("login");
});
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){
    
})

router.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports=router;