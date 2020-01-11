var express = require('express'),
	mongoose = require('mongoose');

var schema = mongoose.Schema;

var countSchema = new schema({
	count : Number
	
})

module.exports = mongoose.model("Count",countSchema); 
 