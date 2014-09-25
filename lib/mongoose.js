var mongoose = require('mongoose');
mongoose.connect('mongodb://jinc:1234@ds031647.mongolab.com:31647/server');

var db = mongoose.connection;
db.on('error', function (err) {
    console.log('connection error:', err.message)
});
db.once('open', function callback () {
	console.log('Connected to DB!')
});

module.exports = mongoose;