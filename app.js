var express = require('express');


var mongoose = require('./lib/mongoose');
var MongoStore = require('connect-mongo')(express)
var http = require('http');
var path = require('path');


/**
 * New require.
 */
global.required = function (val) {
	return require(path.join(__dirname, val));
}

var app = express();

/**
 * Response error.
 */
app.use(function (req, res, next) {
	res.sendHttpError = function(status, message) {
		res.json({message: message}, status);
	};
	next();
});



app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser('your secret here'));
app.use(express.session({
	secret: 'secret',
	key: 'cid',
	cookie: {
		path: '/',
		httpOnly: true,
		maxAge: null,
		store: new MongoStore({mongoose_connection: mongoose.connection})
	}
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(app.router);
required('models').init();
required('routes')(app);

/*
* Processing error
*/
app.use(function (err, req, res, next) {
	//TODO доработать систему вывода ошибок
	var status = (typeof err == 'number') && err || err.status || 0;
	var message = err.message || http.STATUS_CODES[status] || 'Error';

	console.log('\x1B[31m\x1B[1m', 'Error: ' + status, '\x1B[22m\x1B[39m', err.stack);//jinc

	if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
		res.sendHttpError(status, message);
	} else {
		res.send('<p ><font size="5" face="monospace">'+status+' '+message+'</font><p>');
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});