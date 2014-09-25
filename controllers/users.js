var Model = required('models').model('user');
var crudUser = required('lib/crudHandlers')(Model);

module.exports = {
	list: function (req, res, next) {
		if(req.params.id) return next();
		crudUser.list(function (err, data) {
			if (err) return next(err);
			res.json(data);
		})
	},
	read: function (req, res, next) {
		if(!req.params.id) return next();
		crudUser.read(req.params.id, function (err, data) {
			if (err) return next(err);
			res.json(data);
		});
	},
	create: function (req, res, next) {
		if(!Object.keys(req.body).length) return next();
		var data = {
			name: req.body.name,
			password: req.body.password,
		};
		crudUser.create(data, function (err, data) {
			if (err) return next(err);
			res.json(data);
		});
	},
	update: function (req, res, next) {
		if(!req.params.id || !Object.keys(req.body).length) return next();
		var data = {
			name: req.body.name,
			password: req.body.password,
		};
		crudUser.update(req.params.id, data, function (err, data) {
			if (err) return next(err);
			res.json(data);
		});
	},
	delete: function (req, res, next) {
		if(!req.params.id) return next();
		crudUser.delete(req.params.id, function (err, data) {
			if (err) return next(err);
			res.json(true);
		});
	}
}