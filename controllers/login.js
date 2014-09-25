var ModelUser = required('models').model('user');
var crudUser = required('lib/crudHandlers')(ModelUser);

module.exports = {
	isregistered: function (req, res, next) {
		if(!req.body.login) return next();
		ModelUser.findOne({name: req.body.login},function (err, user) {
			if(err) return next(err);
			res.json(!!user, 200);
		});
	},
	authorization: function (req, res, next) {
		if(!req.body.login || !req.body.password) return next();
		//status 
		//1 - ok
		//2 - invalid user
		//3 - invalid password
		ModelUser.findOne({name:req.body.login},function (err, date) {
			if(err) return next(err);

			var isAjax = res.req.headers['x-requested-with'] == 'XMLHttpRequest';

			if(date){
				if(date.chackPassword(req.body.password)){
					req.session.user = date._id;
					isAjax && res.json({status: 1, user: date}, 200) || res.redirect('back');
				}else{
					isAjax && res.json({status: 3}, 200) || res.redirect('back');
				}
			}else{
				isAjax && res.json({status: 2}, 200) || res.redirect('back');
			}
		});
	},
	unauthorization: function (req, res, next) {
		req.session.user = null;
		res.json(true, 200);
	},

	//TODO клон создании пользователя
	registration: function (req, res, next) {
		if(!req.body.login || !req.body.password) return next();
		var data = {
			name: req.body.login,
			password: req.body.password,
		};
		crudUser.create(data, function (err, data) {
			if (err) return next(err);
			res.json(data);
		});
	},

	isauthorization: function (req, res, next) {
		crudUser.read(req.session.user, function (err, data) {
			if(err) return next(err);
			if(!data){
				if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
					return next(401)
				} else {
					res.send('<form method="post" enctype="application/json" action="/login" align="center">'
					+ '<p>LOGIN: <input type="text" name="login"></p>'
					+ '<p>PASSWORD: <input type="password" name="password"></p>'
					+ '<p><input type="submit" value="Submit"></p>'
					+ '</form>');
				}
			}else{
				next();
			}
		})
	}
}
//auto(login,password) ---> isregis(login) ---> unauto()  