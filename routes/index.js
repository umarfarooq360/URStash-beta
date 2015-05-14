/*
 *Controls the flow of the whole website. What happens when what is clicked etc
 *
 */

var express = require('express');
var router = express.Router();
var sanitize = require('mongo-sanitize');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'URStash' });
});



/* GET Search Results page. */
router.get('/searchResults', function(req, res) {
    var db = req.db;
    var collection = db.get('bookItems');
    //First search
    collection.find({},{},
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
    
    var db = req.db;
    if( options === "books"){
        var collection = db.get('bookItems');
        //Search by name "Relevance" search
        console.log("Query is " + searchQuery);
        //collection.createIndex({subject: "Name"});
        //Find the entry using the query and sort by score
        var cursor = collection.find( 
            {
                $text : {$search: searchQuery}
            } ,
            { 
                score: { $meta: "textScore" }
                ,limit:4
                 ,sort: {score}
             },

               function(err,items){
                //log the items
                console.log(items);
               
        
                res.render('search', {
                        "search" : items
                    });}

             );


          

    }else if( options === "electronics"){
        var collection = db.get('electronicItems');
    }else if( options === "furniture"){
        var collection = db.get('furnitureItems');
    }

});




/* GET New User page. */
router.get('/newItem', function(req, res) {
    res.render('newItem', { title: 'Sell an Item' });
});

/* POST to Add User Service */
router.post('/addItem', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes

    var bookName = req.body.bookname;
    var bookAuthor = req.body.bookauthor;
    var bookISBN = req.body.bookisbn;
    var bookCondition = req.body.bookcondition;
    var bookPrice = req.body.bookprice;

    // Set our collection
    var collection = db.get('bookItems');

    // Submit to the DB
    collection.insert({
        "Name" : bookName,
        "Author" : bookAuthor,
        "ISBN" : bookISBN,
        "Condition": bookCondition,
        "Price": bookPrice
    }, function (err, doc) {
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