var express = require('express'),
	mongoose = require('mongoose');

var schema = mongoose.Schema;

var studentSchema = new schema({
	name : String,
	RID : String,
	school : String,
	class : String,
	mobile : String,
	email : String,
	events : [String],
	parent_name : String,
	parent_no : String
	
})

module.exports = mongoose.model("Student",studentSchema); 
 