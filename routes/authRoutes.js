var express = require('express'),
	passport = require('passport'),
	LocalStrategy = require('passport-local');
	
var router = express.Router();

var Admin = require('../models/Admin');
var Student = require('../models/Student');

//PASSPORT CONFIGURATION===========
router.use(require('express-session')({
  secret: "Mogambo!",
  resave: false,
  saveUninitialized: false
}))

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

router.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();  
});

//AUTH ROUTES===================
router.get("/acc",isLoggedIn,(req,res)=>{
	Student.find({},(err,all)=>{
		res.render("admin",{student:all});
	})
})

//login
router.get("/login",(req,res)=>{
	res.render("adminLogin");
})

router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/admin/acc",
		failureRedirect: "/admin/login"
	}),(req,res)=>{

})


//register
router.get("/register",(req,res)=>{
	res.render("adminLogin");
})


router.post("/register",(req,res)=>{
	var newAdmin = new Admin({
		username : req.body.username
		});

    Admin.register(newAdmin,req.body.password,function(err,user){
	    if(err){
	      console.log(err);
	      res.render("adminLogin");
	    }else{
	      	passport.authenticate("local")(req,res,function(){
	        res.redirect("/admin/acc");
	      })
	    }
	})
})


//logout
router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/") 
})

//middleware for login
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;