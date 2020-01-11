var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	methodOverride = require('method-override');

var app = express();

//Database config===================================
var url = 'mongodb://localhost:27017/razzmatazz';
const uri = "mongodb+srv://admin:Abcabcabv34@cluster0-6hudo.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(uri, {useNewUrlParser: true, useFindAndModify:false, useUnifiedTopology: true}, err=>{
	if(err) console.log(err);
	else
		console.log("connected");
});


//App config=======================================
app.set("view engine","ejs");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//Routes===========================================
var indexRoutes = require("./routes/index");
app.use(indexRoutes);

//Application listen at port 8080
var port = process.env.PORT|8080;
app.listen(port,(err)=>{
	if(err)
		console.log(err);
	else
		console.log("Server started at port "+port);
}) 
