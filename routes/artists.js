var express = require('express');
// var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

var router = express.Router();

// router.get('/', function (req, res) {
//   res.render('templates/artists-form');
// });

router.get('/', function (req, res) {
  var collection = global.db.collection('artists');

  collection.find().toArray(function (err, artists) {
    var formattedArtist = data.map(function (artist) {
      return {
        _id:      artist._id,
        artist:  artist.artists,
        genre:    artist.genre,
        wiki:     artist.wiki 
        createdAt: moment(artists._id.getTimestamp()).fromNow()
      };
    });

    nodetunes.getAllArtists(function (err, cn) {
    	res.render('templtes/artists-form', {artist:artist});
    });

    res.render('templates/index-table', {artists: formattedArtist});
  });
});

router.get('/new', function (req, res) {
  res.render('templates/artists-form');
});

router.post('/', function (req, res) {
  var collection = global.db.collection('artist');

  collection.save(req.body, function () {
    res.redirect('/artist')
  });
});

router.post('/new/:id/submit', function (req, res) {
  var collection = global.db.collection('artist');

  collection.update(
    {_id: ObjectID(req.params.id)},
    {$set: {complete: true}},
    function () {
      res.redirect('/new')
    });
});

module.exports = router;