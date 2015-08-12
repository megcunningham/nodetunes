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
    var formattedArtist = artists.map(function (artist) {
      return {
        _id:      artists._id,
        artist:   artists.artists,
        genre:    artists.genre,
        wiki:     artists.wiki 
      };
    });

    res.render('templates/index-table', {artists: formattedArtist});
  });
});

router.get('/new', function (req, res) {
  res.render('templates/artists-form');
});

router.post('/', function (req, res) {
  var collection = global.db.collection('artists');

  collection.save(req.body, function () {
    res.redirect('/artists')
  });
});

router.post('/new/:id/submit', function (req, res) {
  var collection = global.db.collection('artists');

  collection.update(
    {_id: ObjectID(req.params.id)},
    {$set: {complete: true}},
    function () {
      res.redirect('/new')
    });
});

module.exports = router;


























// var express = require('express');
// var ObjectID = require('mongodb').ObjectID;

// var Artists = require('../models/Artists');

// var router = express.Router();

// router.get('/', function (req, res) {
// 	 Artists.getAllArtists(function (err, cn) {
//    	res.render('templates/artists-form', {artists:artists});
//    });

// router.get('/new', function (req, res) {
//   res.render('templates/artists-form');
// });

// router.post('/', function (req, res) {
//   var collection = global.db.collection('artist');

//   collection.save(req.body, function () {
//     res.redirect('/artists')
//   });
// });

// router.post('/new/:id/submit', function (req, res) {
//   var collection = global.db.collection('artist');

//   collection.update(
//     {_id: ObjectID(req.params.id)},
//     {$set: {complete: true}},
//     function () {
//       res.redirect('/new')
//     });
// });

// module.exports = router;