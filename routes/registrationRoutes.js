var express = require('express'),
	pdf = require("pdf-creator-node"),
    fs = require('fs');

var router = express.Router()

var Student = require('../models/Student')
var Count = require('../models/Count')
// Read HTML Template
var html = fs.readFileSync(__dirname+'/template.html', 'utf8');

var options = {
        format: "A3",
        orientation: "portrait",
        header: {
            height: "25mm",
        },
        "footer": {
            "height": "28mm"            
        }
    };


//this will work when application starts
var newCount = new Count({count:1})
Student.countDocuments({},(err,c)=>{
	if(err) console.log(err)
	else{
		newCount.count=c
		newCount.save((err,a)=>{
			if(err) console.log(err)
			else console.log(a)
		})
	}
})
//Routes
router.get("/",(req,res)=>{
	res.render("newRegistration")
})

var student1
async function fun1(req,res,next){
	student1 = req.body.student
	student1.events = req.body.events

	student1.RID = "#RAZZ_ID"+(newCount.count+1).toString(10)
	
	if(student1.school=="NIT Silchar" || student1.school=="National Institue of Technology Silchar" || student1.school=="NITS" || student1.school=="NIT S" || student1.school=="NIT"){
		res.send("NIT Silchar students not allowed in registration")
		return
	}
	//PDF creation
	var document = {
	    html: html,
	    data: {
	        student:student1
	    },
	    path: __dirname+"/registration.pdf"
	};
	//console.log(document)

	//Updating student
	var newStudent = new Student(student1)
	await newStudent.save((err,s)=>{
		if(err) console.log(err)
		else{
			
		} 
	})
	

	//Updating count
	newCount.count++
	await newCount.save((err,a)=>{
		if(err) console.log(err)
		else {}
	})

	
	await pdf.create(document, options)
	    .then(res1 => {
	    	console.log(res1)
	    	next()
	    }).catch(err=>{
	    	console.log(err)
	    	next()
	    })

}




router.post("/",fun1,(req,res)=>{
	console.log("I'm done")
	res.redirect("/registration/xyz")
})

router.get("/xyz",(req,res)=>{
	res.redirect("/success")
})

module.exports = router
