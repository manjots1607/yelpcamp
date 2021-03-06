var Campground=require("../models/campground");
var Comment=require("../models/comment");

var middlewareObj={};

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first");
    res.redirect("/login");
};

middlewareObj.isAuthor=function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err, camp) {
           if(err){
               console.log(err);
               console.log("Something went wrong");
           }
           else{
               console.log(camp.author.username);
               if(camp.author.id.equals(req.user._id)){
                next();
               }
               else{
                   req.flash("error","you does'nt have permission to do that");
                   res.redirect("/campgrounds");
               }
           } 
           
        });
        
    }
    else{
        res.redirect("/campgrounds");
    }
};

middlewareObj.isCommentAuthor=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.cid,function(err, comment) {
           if(err){
               console.log(err);
               console.log("Something went wrong");
           }
           else{
               console.log(comment.author.username);
               if(comment.author.id.equals(req.user._id)){
                next();
               }
               else{
                   req.flash("error","you does'nt have permission to do that");
                   res.redirect("/campgrounds/"+req.params.id);
               }
           } 
           
        });
        
    }
    else{
        req.flash("error","you does'nt have permission to do that");
        res.redirect("/campgrounds/"+req.params.id);
    }
};
module.exports=middlewareObj;