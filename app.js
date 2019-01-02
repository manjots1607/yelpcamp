var express=require("express");
var app= express();

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    var campgrounds=[
            {
                name:"sharmas leh camp",
                image:"https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg"
            },
            {
                name:"Solang campground",
                image:"https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_960_720.jpg"
            },
            {
                name:"pangong camps",
                image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg"
            }
        ];
    res.render("campgrounds",{campgrounds:campgrounds});
})



app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp app started");
});