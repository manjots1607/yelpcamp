var express = require("express"),
        app = express(),
 bodyparser = require("body-parser"),
   mongoose = require("mongoose"),
  Campground= require("./models/campground"),
  seedDB    = require("./seed");
  
  seedDB();
   
   
 mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true});


app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");



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

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
   Campground.find({},function(err,allCampgrounds){
       if(err){
           console.log("Something went wrong");
           console.log(err);
       }else{
           res.render("campgrounds",{campgrounds:allCampgrounds});
           
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
            console.log(showcamp);
            
            res.render("show",{campground:showcamp});
            
            
        }
    });
    
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp app started");
});