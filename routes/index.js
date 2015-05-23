/*
 *Controls the flow of the whole website. What happens when what is clicked etc
 *
 */

var express = require('express');
var router = express.Router();
var sanitize = require('mongo-sanitize');
var passport = require('passport');
var Book = require('../models/books');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'URstash' });
});


/* POST for login*/
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);

router.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

router.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
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


/* post Search Results page. */
router.post('/search', function(req, res) {
    //Get the query and sanitize
    var searchQuery = sanitize(req.body.searchItem);
    
    //See how the check boxes are set up
    var options = req.body.options;
        
    if( options === "books"){
       
        //Search by name "Relevance" search
        console.log("Query is " + searchQuery);
        //collection.createIndex({Name : "text"});
        

        Book.textSearch(searchQuery, function(err, output){
                if(!err){
                    console.log(output);
                    res.render('search', {
                            "search" : output
                        });
                    }else{
                        console.log("ERROR"+ err);
                    } 

        } );                
            
            /*
            Book.find( 
            {
                $text : {$search: searchQuery}
            } ,
            { 
                score: { $meta: "textScore" }
               // ,limit:4
                 //sort: { score: { $meta: "textScore" } }
                
             },

               function(err,items){
                //log the items
                //items = items.sort(  { Name:-1 });
               //  items = items.sort(  {score: { $meta: "textScore" } });
                    if(!err){
                    console.log(items);
                    res.render('search', {
                            "search" : items
                        });
                    }else{
                        console.log("ERROR"+ err);
                    }
                }
             );
            */
          

    }else if( options === "electronics"){
        var collection = db.get('electronicItems');
        
    }

});




/* GET New User page. */
router.get('/newItem', function(req, res) {
    res.render('newItem', { title: 'Sell an Item' });
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
        "Price": bookPrice
    });

    item.save(function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /addItem
            res.location("searchResults");
            // And forward to success page
            res.redirect("searchResults");
        }
    });
});




module.exports = router;