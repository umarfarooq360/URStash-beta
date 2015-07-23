/*
 *Controls the flow of the whole website. What happens when what is clicked etc
 *
 */

var express = require('express');
var router = express.Router();
var sanitize = require('mongo-sanitize');
var passport = require('passport');

//Loading the models for mongoose
var Book = require('../models/books');
var Account = require('../models/user');
var Item = require('../models/item');
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'urstashseller@gmail.com',
        pass: 'alexissexy'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { layout: 'layout',title: 'URstash' , user:req.user});
});


/* Handle Login POST */
router.post('/login', passport.authenticate('local',{ successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: "Ahhhh!!Wrong" }), function(req, res) {
    
    res.redirect('/');

});

/* GET New User page. */
router.get('/login', function(req, res) {
    res.render('login', { title: 'Login/Signup' ,user:req.user });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/* Handle Registration POST */
router.post('/signup', function(req,res){
    Account.register(
        new Account({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname ,
            phonenumber:req.body.phonenumber
            
        }),req.body.password , function(err, account) { 
            if (err) {
                    console.log('Error registering');
                    console.log(account);
                     return res.render("login", {info: "Sorry. That email already exists. Try again."});
                    //return res.render('login', { account : account });
                }

            passport.authenticate('local')(req, res, function () {
                    console.log('Error forwarding');
                    res.redirect('/');
                });    
    } );
});


/* GET Search Results page. */
router.get('/searchResults', function(req, res) {
    //var db = req.db;
    //var collection = db.get('bookItems');
    //First search
    Book.find({},{},
     function(err,items){
        console.log(items);
        res.render('searchResults', {
            "searchResults" : items
        });

    });
});

/* GET Search Results page. */
router.get('/showallusers', function(req, res) {
    //var db = req.db;
    //var collection = db.get('bookItems');
    //First search
    Account.find({},{},
     function(err,items){
        console.log(items);
        res.render('searchResults', {
            "searchResults" : items
        });

    });
});


/* GET Search Results page. Shows all Items for debug purposes */
router.get('/itemSearch', function(req, res) {
    //var db = req.db;
    //var collection = db.get('bookItems');
    //First search
    Item.find({},{},
     function(err,items){
        console.log(items);
        res.render('itemSearch', {
            "results" : items
        });

    });
});



/* GET Sell Success page. */
router.get('/sell/success', function(req, res) {
    res.render('sellSuccess', { title: 'Sell Success' ,user: req.user });
});


/* post Search Results page. */
router.post('/search', function(req, res) {
    //Get the query and sanitize
    var searchQuery = sanitize(req.body.searchItem);
    
    //See how the check boxes are set up
    var options = req.body.options;
    
    if( options === "books"){
       
        //Search by name "Relevance" search
        console.log("Query is " + searchQuery);
        
        //Perform a text search and sort results by price and condition
        Book.textSearch(searchQuery, {filter:{ Sold: false}, sort:{ Price: 1, Condition: -1 } }, 
            function(err, output){
                if(!err){
                    console.log(output);
                    res.render('search', {
                            "search" : output,
                            "type": 0, user:req.user
                        });
                    }else{
                        console.log("ERROR"+ err);
                    } 

        } );                
            
       
    }else if( options === "electronics"){
         //Search by name "Relevance" search
        console.log("Query is " + searchQuery);
        
        //Perform a text search and sort results by price and condition
        Item.textSearch(searchQuery, {filter:{ Sold: false},sort:{ Price: 1, Condition: -1 } }, 
            function(err, output){
                if(!err){
                    console.log(output);
                    res.render('search', {
                            "search" : output,
                            "type": 1
                            , user:req.user


                        });
                    }else{
                        console.log("ERROR"+ err);
                    } 

        });                
        
    }

});




/* GET New User page. */
router.get('/newItem', function(req, res) {
    if(!req.user){
        res.render('login', { title: 'Login/Signup', message:"Please login!"} );
    }
    console.log(req.user);
    res.render('newItem', { title: 'Sell an Item', user: req.user });
});

/* POST to Add User Service */
router.post('/addItem', function(req, res) {
    // Get our form values. These rely on the "name" attributes

    var bookName = req.body.bookname;
    var bookAuthor = req.body.bookauthor;
    var bookISBN = req.body.bookisbn;
    var bookCondition = req.body.bookcondition;
    var bookPrice = req.body.bookprice;
 

    // Submit to the DB
    var item = new Book({
        "Name" : bookName,
        "Author" : bookAuthor,
        "ISBN" : bookISBN,
        "Condition": bookCondition,
        "Price": bookPrice,
        "Seller": req.user._id,
        "Sold": false
    });

    item.save(function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /addItem
            res.location("sell/success");
            // And forward to success page
            res.redirect("sell/success");
        }
    });
});

/* POST to Add Electronics or furniture item */
router.post('/addENF', function(req, res) {
    
    //Get fields from the form
    var enfName = req.body.enfname;
    var enfDescription = req.body.enfdescription;
    var enfCondition = req.body.enfcondition;
    var enfPrice = req.body.enfprice;
    var enfSeller = req.user._id;

    

    //create amn item out of the fields
    var item = new Item({
        "Name": enfName,
        "Description" : enfDescription,
        "Condition": enfCondition,
        "Price": enfPrice,
        "Seller": enfSeller,
        "Sold": false
    });

    //log the seller's id
    console.log(enfSeller);
    console.log(item);

    //save the item to the database
    item.save(function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the item to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /addItem
            res.location("itemSearch");
            // And forward to success page
            res.redirect("itemSearch");
        }
    });



});


/* GET Book Selling Page. */
router.get('/book/:id', function(req, res) {
    //var db = req.db;
    //var collection = db.get('bookItems');
    //First search
    //Only for books
    console.log(req.params.id);
    Book.find({ ISBN : req.params.id, Sold: false },{},
     function(err,items){
        if(err){console.log(err);}
        console.log(items);
        
        res.render('bookResults', {
            "search" : items , user:req.user

        });

    });
});

/* GET To actually sell a book */
router.get('/book/buy/:id', function(req, res) {
    //Redirect if not logged in
    if(!req.user){
        res.render('login', { title: 'Login/Signup', message:"Please login!"} );
    }

    //Only for books
    console.log(req.params.id);

    //Find the book and set to sold
    Book.findByIdAndUpdate(req.params.id ,
       {$set: {Sold: true}},{},
     function(err,items){
        if(err){console.log(err);}
        console.log(items);
        //Find the seller from db   
        var seller = items.Seller;
        
        
        Account.find({ _id: seller},{}, 
            function(error,results){
                if(error){console.log(err);}
                //get sellers username/email
                console.log(results);    
                var seller_email = results[0].username;
                 console.log("Seller email: " + seller_email);
                var item_name = items.Name;
                //Mail the seller
                var mailOptions = {
                    from: 'URStash Seller <urstashseller@gmail.com>', // sender address
                    to: seller_email, // list of receivers
                    subject: "Selling "+ item_name , // Subject line
                    text: 'Heyy! '+ req.user.firstname  +'wants to buy '+
                       items.Name+ ' from you. Please contact the buyer at '+
                       req.user.username+ ' and decide a time and place to meet and sell the item.' // plaintext body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                    }else{
                        console.log('Message sent: ' + info.response);
                        res.render('buySuccess', {
                            "data" : mailOptions
                        });
                    }
                });


        });

        

    });
});


/* GET home page. */
router.get('/tmplogin', function(req, res) {
    res.render('tmplogin', { layout: 'layout',title: 'URstash' , user:req.user});
});



module.exports = router;