var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'URStash' });
});


/* GET Userlist page. */
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

    // Set our collection
    var collection = db.get('bookItems');

    // Submit to the DB
    collection.insert({
        "Name" : bookName,
        "Author" : bookAuthor,
        "ISBN" : bookISBN,
        "Condition": bookCondition
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