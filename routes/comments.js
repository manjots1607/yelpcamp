var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground.js");
var Comment=require("../models/comment.js");
var middleware=require("../middleware");


router.get("/new",middleware.isLoggedIn,function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
            
        }else{
            res.render("comments/new",{campground:campground}); 
        }
    });
   
});

router.post("/",middleware.isLoggedIn,function(req,res){
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
                   comment.author.id=req.user._id;
                   comment.author.username=req.user.username;
                   comment.save();
                   console.log(comment);
                  
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/"+req.params.id);
               }
           });
       }
   }); 
});
router.get("/:cid/update", middleware.isCommentAuthor ,function(req,res){
    
          Comment.findById(req.params.cid,function(err, comment) {
              if(err){
                   console.log("something went wrong");
                   console.log(err);
                   res.redirect("/campgrounds/"+req.params.id);
              }
              else{
                   res.render("comments/update",{campground_id:req.params.id,comment:comment});
              }
          });
         
      
 
});
router.put("/:cid", middleware.isCommentAuthor ,function(req,res){
    Comment.findByIdAndUpdate( req.params.cid,req.body.comment,function(err,comment){
        if(err){
            console.log(err);
            console.log("something went wrong");
            res.redirect("/campgrounds/"+req.params.id);
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
    
});
router.delete("/:cid", middleware.isCommentAuthor ,function(req,res){
   Comment.findByIdAndRemove(req.params.cid,function(err){
       if(err){
           console.log("Something went wrong");
           console.log(err);
           res.redirect("/campgrounds/"+req.params.id);
       }
       else{
          res.redirect("/campgrounds/"+req.params.id);
       }
   });
});

module.exports=router;
