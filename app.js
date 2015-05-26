var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');


// New Code to move to mongoose db system
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ keys: ['secretkey1', 'secretkey2', '...']}));

//app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(session());
app.use(passport.initialize());
app.use(passport.session());


//Changed database url
mongoose.connect('mongodb://admin:passw0rd@proximus.modulusmongo.net:27017/Owoven3i');



/*
// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);
*/

// Configure passport-local to use user model for authentication
var Account = require('./models/user');
passport.use(Account.createStrategy(    ));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());



app.use('/', routes);
app.use('/users', users);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


/*
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
*/


module.exports = app;
