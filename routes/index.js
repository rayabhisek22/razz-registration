var express = require('express')
var router = express.Router()

router.get("/",(req,res)=>{
	res.redirect("/registration")
})
//Admin Routes
var authRoutes = require('./authRoutes');
router.use("/admin",authRoutes);

//Registration Routes
var registrationRoutes = require('./registrationRoutes')
router.use("/registration",registrationRoutes)

//sucess route
router.get("/success",(req,res)=>{
	res.render("Success")
})

//download route
router.get("/download",(req,res)=>{
	res.download(__dirname+"/registration.pdf")
})


module.exports = router