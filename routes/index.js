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


//email related stuff
var nodemailer = require('sendgrid')('umarfarooq360','curlyfries123')

//Added email template for selling emails
var email_template ="<p><span class='sg-image' style='float: none; display: block; text-align: center;'><img height='128'"+ 
"src='https://urstash.mod.bz/images/pig_icon_grey.png'" + 
"style='width: 128px; height: 128px;' width='128' /></span></p>"+
"<p style='text-align: center;'><span style='font-size:28px;'><span style='font-family:comic sans ms,cursive;'>URStash</span></span></p>"+
"<p style='text-align: center;'><span style='font-size:16px;'><span style='font-family:georgia,serif;'>"; 

var email_footer = "</span></span></p><hr/><p style='text-align: center;'><span style='font-size:14px;'><span style='font-family:trebuchet ms,helvetica,sans-serif;'>If you have any concerns "+
"email us at urstashseller@gmail.com</span></span></p>";

//initialize the router
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { layout: 'layout',title: 'URstash' , user:req.user});
});


/* Handle Login POST */
router.post('/login', passport.authenticate('local',{ successRedirect: '/',
 failureRedirect: '/loginerror', successFlash: 'Welcome!' ,
 failureFlash: true }

 )
);

/* GET New User page. */
router.get('/login', function(req, res) {

    res.render('login', { title: 'Login/Signup' ,user:req.user, message: '' });


});

/* GET New User page. */
router.get('/loginerror', function(req, res) {    
    res.render('login', { title: 'Login/Signup' ,user:req.user, message: 'Incorrect username or password!' });
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
router.get('/booklist', function(req, res) {

    Item.find({},{},
       function(err,items){
        console.log(items);
        res.render('itemList', {
            "search" : items,
            "type": 1, user:req.user
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

router.get('/forgotPassword', function(req, res) {    
    res.render('forgotPassword', { title: 'Forgot password' });
});



/* GET Sell Success page. */
router.get('/sell/success', function(req, res) {
    res.render('sellSuccess', { title: 'Sell Success' ,user: req.user });
});

router.post('/forgot', function(req, res) {
    var email = req.body.username;
    console.log(email);
    link = 'https://urstash.mod.bz/forgot/'

    //get the link for the 
    Account.find({username:email},{},
       function(err,items){
       

        link = link+ items[0]._id
        console.log(link)
        var msg = new nodemailer.Email();
        msg.addTo(email);
        msg.setFrom('urstashforgot@sendgrid.com');
        msg.setSubject("Reset your Password");
        msg.setHtml(email_template+'Click the link below to reset password.<br><a href=\''+ 
                     link+ '\'>Link</a><br>'+email_footer);

        // send mail with defined transport object
        nodemailer.send(msg, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
                res.render('index', {
                    
                });
            }
            });

    });


});    

/* post Search Results page. 
    Using a unified search thing
    */
router.post('/search', function(req, res) {
    //Get the query and sanitize
    var searchQuery = sanitize(req.body.searchItem);
    
    //See how the check boxes are set up
    
        //Search by name "Relevance" search
        console.log("Query is " + searchQuery);
        
        //Perform a text search and sort results by price and condition
        Item.textSearch(searchQuery, {filter:{ },sort:{ Price: 1, Condition: -1 } }, 
            function(err, output){
                if(!err){
                    console.log(output);
                    res.render('searchItems', {
                        "search" : output,
                        "type": 1
                        , user:req.user


                    });
                }else{
                    console.log("ERROR"+ err);
                } 

            });                
        


    });




    router.get('/newItem', function(req, res) {
        if(!req.user){
            res.render('login', { title: 'Login/Signup', message:"Please login!"} );
        }
        console.log(req.user);
        res.render('add', { title: 'Sell an Item', user: req.user });
    });



/* POST to Add Electronics or furniture item */
router.post('/addForSale', function(req, res) {

    //Get fields from the form
    var enfName = req.body.name;
    var enfDescription = req.body.description;
    var enfPrice = req.body.price;
    var enfSeller = req.user._id;
    var enfSellerName = req.user.firstname;

    

    //create amn item out of the fields
    var item = new Item({
        "Name": enfName,
        "Description" : enfDescription,
        "Price": enfPrice,
        "Seller": enfSeller,
        "Sold": false,
        "SName": enfSellerName,
        "SEmail":req.user.username
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
            res.location("sell/success");
            // And forward to success page
            res.redirect("sell/success");
        }
    });



});

//This gets the password reset page and sets the reset id depending on the url
router.get('/forgot/:id',function(req, res) {
    
    resetId = '/reset/'+req.params.id;
    
    console.log("resetid:"+resetId);
    res.render('resetPassword', { title: 'Reset Password',resetLink: resetId } );

});

//post request to change password
router.post('/reset/:id', function(req, res) {
    
    newPassword = req.body.password;
    console.log(newPassword);

    //find one acccount with id
    Account.findOne({_id: req.params.id},function(err,obj){
        if(err){console.log(err);}
         
        //set new password
        console.log(obj);
        obj.setPassword(newPassword,function(){
            obj.save();
            console.log("updated pass")
            res.render('login');
        });

    });
    


});    


/* GET To actually sell an item */
router.get('/item/buy/:id', function(req, res) {
    //Redirect if not logged in
    if(!req.user){
        res.render('login', { title: 'Login/Signup', message:"Please login!"} );
    }else{

        //Only for books
        console.log(req.params.id);

        //Find the book and set to sold
        Item.findByIdAndUpdate(req.params.id ,
            {$set: {Sold: true}},{}, function(err,items){
            
            if(err){console.log(err);}
            console.log(items);
            //Find the seller from db   
            var seller = items.Seller;
            
            //removed call to get seller email
            var seller_email = items.SEmail;
            console.log("Seller email: " + seller_email);
            var item_name = items.Name;
            var msg = new nodemailer.Email();
            msg.addTo(seller_email);
            msg.setFrom('URStash Seller <urstashseller@sendgrid.com>');
            msg.setSubject("Selling "+ item_name);
            msg.setHtml( email_template+'Heyy! '+ req.user.firstname  +' wants to buy '+
                items.Name+ ' from you. Please contact the buyer at '+
                req.user.username+ ' and decide a time and place to meet and sell the item.'
                   + email_footer); // plaintext body
    

                // send mail with defined sendmail object
            nodemailer.send(msg, function(error, info){
                if(error){
                    console.log(error);
                    res.render('error', {
                        "message" : error
                    });
                }else{
                    console.log('Message sent: ' + info.response);
                    res.render('buySuccess', {
                        
                    });
                }
                });
       



            });
        }
});


router.get('/terms', function(req,res){
    res.render('terms', {layout: 'layout', title: 'Terms and conditions'});
});

// Link to about page
router.get('/about', function(req,res){
    res.render('about', {layout: 'layout', title: 'About URStash'});
});

//tring to test a new mail client
router.get('/emailtest',function(req, res) {
       
    var mailOptions = {
      from: "urstashseller@gmail.com",
      to: "omar.farooq@richmond.edu",
      subject: "Hello",
      generateTextFromHTML: true,
      html: "<b>Hello world!</b>"
    };

    smtpTransport.sendMail(mailOptions, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log(response);
      }
      smtpTransport.close();
    });

    res.render('sellSuccess')



});

/* GET 404 page. */
router.get('/*', function(req, res) {
    res.render('404.jade', { layout: 'layout',title: '404 - page not found!' , user:req.user});
});



module.exports = router;