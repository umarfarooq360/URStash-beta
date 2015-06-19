
var mongoose = require('mongoose');

var itemSchema= new mongoose.Schema({
	id: String,
	Name: String,
	Description	: String,
	Condition: String,
	Price: Number,
	Seller: String
});

//Adding text search features
var textSearch = require("mongoose-text-search");
itemSchema.plugin(textSearch);

itemSchema.index({
	Name: "text",
	Description: "text"
},{
	name: "matching_index",
	weights: {
		Name : 5,
		Description : 1,
		
	}
});


module.exports = mongoose.model('Item',itemSchema);