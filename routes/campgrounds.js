var express=require("express");
var router=express.Router();
var Campground=require("../models/campground.js");
var middleware=require("../middleware");


router.get("/",function(req,res){
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

router.post("/", middleware.isLoggedIn, function(req,res){
    
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.desc;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    
    
    var newCampground={name:name,image:image,description:desc,author:author};
    Campground.create(newCampground,function(err,newCampground){
        if(err){
            console.log("Something went wrong");
        }else{
            console.log(newCampground);
            res.redirect("/campgrounds");
        }
    })
    
    
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("new");
});

router.get("/:id",function(req,res){
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


//EDIT CAMPGROUND==========================================

router.get("/:id/update",middleware.isAuthor,function(req, res) {
    let id=req.params.id;
    Campground.findById(id,function(err,camp){
        if(err){
            console.log("Something went wrong");
            console.log(err);
            res.redirect("/campgrounds/"+id);
        }
        else{
            res.render("update",{campground:camp});
        }
    })
   //res.render("/update"); 
});

//UPDATE CAMPGROUND==========================================
router.put("/:id",middleware.isAuthor,function(req,res){
    let updatedCamp={
        name:req.body.name,
        image:req.body.image,
        description:req.body.desc
    };
    Campground.findByIdAndUpdate(req.params.id,updatedCamp,function(err,camp){
        if(err){
            console.log("something went wrong");
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
         
        }
    });
    // res.send("you reached update page");
});

//===DELETE CAMPGROUND============
router.delete("/:id",middleware.isAuthor,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
           console.log(err);
           console.log("Something went wrong");
           res.redirect("/campgrounds");
       }
       else{
           res.redirect("/campgrounds");
       }
   }) 
});




module.exports=router;