/* 
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	phoneNum: Number

}); */

/*
	A model for a User Account	
*/

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var Account = new mongoose.Schema({
	username: String,
	firstname: String,
	lastname: String,
	phonenumber: Number
	
});

Account.plugin(passportLocalMongoose, {
	usernameField: 'username'
});


module.exports = mongoose.model('Account', Account );