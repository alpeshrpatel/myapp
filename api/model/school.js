var mongoose = require("mongoose");

var School = new mongoose.Schema({
	id 		:String,
	name 	: String, 
	address : String,
	city 	:String,
	country	: String,
	zipcode	:String,
	medium 	: [String],
	website	: String,
	email 	:String, 
	techchers :Number, 
	students : Number, 
	rating : Number, 
	phone :[String]
	},
	{
	collection : 'school',
	strict : false
});


module.exports = School;

