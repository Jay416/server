var mongoose = required('lib/mongoose');
var crypto = require('crypto');

var SOLT = 'solt';

var User = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    hashPwd: {type: String, required: true},
    create: {type: Date, default: Date.now}
});

User.methods.encryptPassword = function (password) {
	return crypto.createHmac('sha1', SOLT).update(password).digest('hex');
}
User.methods.chackPassword = function (password) {
	return this.encryptPassword(password) == this.hashPwd;
}

User.virtual('password')
	.set(function (password) {
		this.hashPwd = this.encryptPassword(password);
	});

module.exports = mongoose.model('User', User);