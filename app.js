var express=require("express");
var app= express();
var bodyparser=require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

var campgrounds=[
            {
                name:"sharmas leh camp",
                image:"https://5.imimg.com/data5/GG/GG/GLADMIN-/rajasthan-desert-tour-500x500.jpg"
            },
            {
                name:"Solang campground",
                image:"http://www.rajasthanvisit.com/Images/CAMPING4.jpg"
            },
            {
                name:"pangong camps",
                image:"http://www.rajasthanvisit.com/Images/CAMPING4.jpg"
            }
        ];

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
   
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name:name,image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
    
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp app started");
});