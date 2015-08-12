var mongo = require('mongodb').MongoClient;

var url = process.env.MONGODB_URL || 'mongodb://localhost:27017/nodetunes';

  mongo.connect(url, function(err, db) {
    global.db = db;
  });
