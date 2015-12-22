//Changed database url
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:alexissexy123@proximus.modulusmongo.net:27017/Owoven3i');
module.exports = mongoose;
