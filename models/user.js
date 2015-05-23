
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	phoneNum: Number

});