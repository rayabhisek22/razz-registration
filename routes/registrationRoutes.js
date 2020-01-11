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
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
        },
        "footer": {
            "height": "28mm",
            "contents": {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'}}
        
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
function fun1(req,res,next){
	student1 = req.body.student
	//student1.events = req.body.events

	student1.RID = "#RAZZ_ID"+(newCount.count+1).toString(10)
	
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
	newStudent.save((err,s)=>{
		if(err) console.log(err)
		else{
			console.log(s)
		} 
	})
	console.log("AA")

	//Updating count
	newCount.count++
	newCount.save((err,a)=>{
		if(err) console.log(err)
		else console.log(a)
	})

	console.log("AAA")
	pdf.create(document, options)
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
	res.redirect("/success")
})

module.exports = router
