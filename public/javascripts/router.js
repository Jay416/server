
define(function (require) {
	'use strict'
	var admin = require('app');

	admin.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'views/admin/home.html',
			controller: 'homeCtrl'
		});
		$routeProvider.when('/images', {
			templateUrl: 'views/admin/images.html'
		});
		$routeProvider.when('/group', {
			templateUrl: 'views/admin/group.html'
		});
		$routeProvider.when('/articles', {
			templateUrl: 'views/admin/articles.html',
			controller: 'articlesCtrl'
		});
		$routeProvider.otherwise({redirectTo:'/home'});
	}]);
});