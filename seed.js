var mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment    = require("./models/comment");
  
var camps=[
     {
        name:"marwari camps",
        image:"http://www.rajasthanvisit.com/Images/CAMPING4.jpg",
        description:"get the feeling of royal camps alongwith dunes of dessert. We have allbasic facilities available such as water."
                
     },
     {
    
        name:"sharmas leh camp",
        image:"https://5.imimg.com/data5/GG/GG/GLADMIN-/rajasthan-desert-tour-500x500.jpg",
        description:"get the feeling of royal camps alongwith dunes of dessert. We have allbasic facilities available such as water."
            
     }
]

function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Campground deleted");
            // camps.forEach(function(camp){
            //   Campground.create(camp,function(err,campdata){
            //       if(err){
            //           console.log(err);
            //       }else{
            //           console.log("added successfully");
            //           Comment.create({
            //               text:"It's the adventure to live in this camp",
            //               author:"david"
            //           },function(err,comment){
            //               if(err){
            //                   console.log(err);
            //               }else{
            //                   console.log("Added Comment");
            //                   campdata.comments.push(comment);
            //                   campdata.save();
            //               }
            //           })
            //       }
            //   }); 
            // });
        }
    });
    
}
module.exports=seedDB;