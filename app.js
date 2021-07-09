const express = require("express");
const ejs = require ("ejs");
const bodyParser = require("body-parser");
const app = express();

let name =[];
 app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

res.render("index.ejs", {players: name});

});
app.post("/", function(req,res){

if(name.length<4){
name.push(req.body.playerName);
}
res.redirect("/");
});




 app.listen(3000,function(){
   console.log("listening on port 3000");
 });
