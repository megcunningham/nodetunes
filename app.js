var express = require('express');
var ejs = require('ejs');

var artists = require('./routes/artists');
// var albums = require('./routes/albums');
// var songs = require('./routes/songs');
var bodyParser = require('body-parser');

require('./lib/mongodb');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.locals.title = "nodetunes";
app.set('view engine', 'ejs');

app.use('/artists', artists);
// app.use('/albums', albums);
// app.use('/songs', songs);

app.use(function (req, res) {
 res.status(403).send('Unauthorized!');
});

// pass 4 arguments to create an error handling middleware
app.use(function (req, res) {
 console.log('ERRRRRRRRRR', err.stack);
 res.status(500).send('My Bad');
});

var port = process.env.PORT || 2000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

 console.log('Example app listening at http://%s:%d', host, port);
});