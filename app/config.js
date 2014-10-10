var mongoose = require('mongoose');
var path = require('path');

mongoURI = 'mongodb://localhost/shortlydb';

// mongoose.connect(mongoURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Monodb connection open!');
});

module.exports = db;



