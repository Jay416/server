var Model = required('models').model('article');
var crudArticle = required('lib/crudHandlers')(Model);

module.exports = {
	list: function (req, res, next) {
		crudArticle.list(function (err, data) {
			if (err) return next(err);
			res.json(data);
		})
	},
	read: function (req, res, next) {
		crudArticle.read(req.params.id, function (err, data) {
			if (err) return next(err);
			res.json(data);
		});
	},
	create: function (req, res, next) {
		crudArticle.create({}, function (err, data) {
			if (err) return next(err);
			res.json(data);
		});
	},
	update: function (req, res, next) {
		var data = {
			title: req.body.title,
			description: req.body.description,
		};
		req.body.anchor && (data.anchor = req.body.anchor);
		req.body.group && (data.group = req.body.group);
		crudArticle.update(req.params.id, data, function (err, data) {
			if (err) return next(err);
			res.json(data);
		});
	},
	delete: function (req, res, next) {
		crudArticle.delete(req.params.id, function (err, data) {
			if (err) return next(err);
			res.json(data);
		});;
	}
}