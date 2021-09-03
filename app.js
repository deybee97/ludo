const express = require("express");
const ejs = require ("ejs");
const app = express();



app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

app.get("/",function(req,res){

res.render("index.ejs");

});





 app.listen(3000,function(){
   console.log("listening on port 3000");
 });
