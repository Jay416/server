var fs = require('fs');
var crypto = require('crypto');
var async = require('async');
var formidable = require('formidable');
var gm = require('gm')

module.exports = {
	upload: function (req, res, next) {
		/*
		* Upload file
		* in req.files
		*/
		var files = [];
		(new formidable())
			.on('file', function(field, file) {
				files.push(file);
				async.waterfall([
					function (callback) {
						fs.readFile(file.path, [], callback);
					},
					function (data, callback) {
						var fileName = crypto.createHmac('md5', data).digest('hex');
						var filePath = __dirname + '/../public/images/upload/' + fileName;
						fs.stat(filePath, function (err, info) {
							if(info && info.isFile()){callback('file exists')}
							else{callback(null, filePath, data)}
						});
					},
					function (filePath, data, callback) {
						fs.writeFile(filePath, data, callback);
					}
				],	
					function (err) {
						if(err){
							console.log('Not load: ', err);	
							return;
						}
						console.log('Load file: ' + file.name);
					}
				);
			})
			.parse(req, function (err) {
				if(err) return next(err);
				res.send(files);
			});
	},
	images: function (req, res, next) {
		var file = req.params.file;
		if(!file) return next();
		fs.readFile(__dirname + '/../public/images/upload/' + file, [], function (err, date) {
			res.send(date);
		});
	},
	form: function(req, res){
	  res.send('<form method="post" enctype="multipart/form-data" action="/file">'
	    + '<p>Data: <input type="filename" name="filename" /></p>'
	    + '<p>file: <input type="file" multiple name="file" /></p>'
	    + '<p><input type="submit" value="Upload" /></p>'
	    + '</form>');
	}
}