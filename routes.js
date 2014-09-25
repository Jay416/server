var controllers = required('controllers');

module.exports = function (app) {

	app.get('/', function (req, res) {
		res.render('index', { title: 'Express' });
	});
	app.get('/admin', controllers.login.isauthorization, function (req, res) {
		res.render('admin');
	});

	app.get('/articles', controllers.articles.list);
	app.post('/articles', controllers.articles.create);

	app.get('/articles/:id', controllers.articles.read);
	app.put('/articles/:id', controllers.articles.update);
	app.delete('/articles/:id', controllers.articles.delete);

	// read(id) ---> list()
	// update(id, data) ---> delete(id) ---> create(data)
	app.get('/users/:id?', controllers.users.read, controllers.users.list);
	app.post('/users/:id?', controllers.users.read, controllers.users.list);
	//app.post('/users/:id?', controllers.login.isauthorization, controllers.users.update, controllers.users.delete, controllers.users.create);

	app.get('/session/:id', function (req, res, next) {
		res.json(req.session[req.params.id], 200);
	});

	app.post('/login', controllers.login.authorization, controllers.login.isregistered, controllers.login.unauthorization); 

	app.get('/mail', controllers.mail.send);
	
	app.get('/file/:file?', controllers.file.images, controllers.file.form);
	app.post('/file', controllers.file.upload);
};