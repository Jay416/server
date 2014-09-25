var objectId = require('mongoose').Types.ObjectId;
var db = required('lib/mongoose');

module.exports = function (model) {
	return {
		list: function (callback) {
			model.find({}, callback);
		},
	
		create: function (obj, callback) {
			model.create(obj, callback);
		},

		read: function (_id, callback) {
			try{
				var id = objectId(_id)
			} catch(e) {
				callback(404);
				return;
			}

			model.findById(_id, callback);
		},

		update: function (_id, obj, callback) {
			try{var id = objectId(_id)}
			catch(e){callback(e)}

			model.update({_id: id}, obj, callback);
		},
		delete: function (_id, callback) {
			try{var id = objectId(_id)}
			catch(e){callback(e)}

			model.remove({_id: id},  callback);
		}
	}
};