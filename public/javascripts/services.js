define(function (require) {
	'use strict'

	var angular = require('angular');
	require('angular-resource');
	function errorArray (data) {
		data = JSON.parse(data);
		if(angular.isArray(data)){
			console.log('WARNING: Response is an array, and expected object.');
			data = data[0];
		}
		return data;
	}
	function errorObject (data) {
		data = JSON.parse(data);
		if(!angular.isArray(data)){
			console.log('WARNING: Response is an object, and expected array.');
			data = [data];
		}
		return data;
	}
	angular.module('admin.services', ['ngResource'])
		.factory('Articles', ['$resource', function($resource){
			return $resource('articles/:id', {
                id: "@id",
            }, {
				get: {method:'GET', transformResponse: errorArray},
				list: {method:'GET', isArray: true, transformResponse: errorObject},
				create: {method:'POST'},
				update: {method:'PUT'},
				delete: {method:'DELETE'},
			});
		}]);
});