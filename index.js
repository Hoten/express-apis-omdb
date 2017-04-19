var express = require('express');
var path = require('path');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');

// this adds some logging to each request
app.use(require('morgan')('dev'));

// enable static file serving
// console.log(__dirname);
// console.log(path.join(__dirname, 'static'));
// serves static files from the "static" directory
// "/index.html" -> loads static/index.html and sends to browser
// app.use(express.static(__dirname + '/static'));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/results', function(req, res) {
    // req.query is an object - it has all the data from the form on the home page
    // res.send(req.query['movie-title']);

    var movieInput = req.query['movie-title'];

    // request module
    request('http://www.omdbapi.com/?s=' + movieInput, function(err, response, dataAsString) {
        console.log("typeof dataAsString", typeof dataAsString);
        var data = JSON.parse(dataAsString);
        console.log("typeof data", typeof data);

        // console.log(response);
        res.render('results', { movies: data.Search });
    });
});

app.get('/movies/:movie_id', function(req, res) {
    var movieId = req.params.movie_id;

    request('http://www.omdbapi.com/?i=' + movieId, function(err, response, dataAsString) {
        var data = JSON.parse(dataAsString);
        console.log(data);
        res.render('movie', data);
    });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
