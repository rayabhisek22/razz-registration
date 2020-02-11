var express = require('express'),
	mongoose = require('mongoose');

var schema = mongoose.Schema;

var winnerSchema = new schema({
	event: String,
	Qualified: [name:String,RazzID:String]
	Winners: [name:String,RazzID:String]
	
})

module.exports = mongoose.model("Winner",winnerSchema); 
 