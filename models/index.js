var mongoose = required('lib/mongoose');
var fs = require('fs');
var path = require('path');
var async = require('async');

var models = {};

module.exports = {
	init: function () {
		var listFile = fs.readdirSync(__dirname);
		for (var i in listFile) {
			var modelName = path.basename(listFile[i], '.js');
			models[modelName] = require(path.join(__dirname, listFile[i]));
		}
	},
	model: function (modelName) {
		var name = modelName.toLowerCase();
		if (typeof models[name] == "undefined") {
			throw "Model '" + name + "' is not exist";
		}
		return models[name];
	}
};