
var mongoose = require('mongoose');

var bookSchema= new mongoose.Schema({
	id: String,
	Name: String,
	Author	: String,
	ISBN: Number,
	Condition: String,
	Price: Number

});

//Adding text search features
var textSearch = require("mongoose-text-search");
bookSchema.plugin(textSearch);

bookSchema.index({
	Name: "text",
	Author: "text"
},{
	name: "matching_index",
	weights: {
		Name : 4,
		Author : 5
	}
});


module.exports = mongoose.model('Book',bookSchema);