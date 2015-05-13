var books = require('google-books-search');

//Get the query from the box
var query = req.params.search;

var options = {
    key: "YOUR API KEY",
    field: 'title',
    offset: 0,
    limit: 4,
    type: 'books',
    order: 'relevance',
    lang: 'en'
};

exports.find = function(req, res) {
    books.search(query, options, function(results) {

        res.jsonp(results);

    });

};