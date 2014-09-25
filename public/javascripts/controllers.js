define(function (require) {
	'use strict'

	var angular = require('angular');

	angular.module('admin.controllers', [])
	   
    	.controller('globalCtrl', ['$scope', '$location', function($scope, $location){
			$scope.navClass = function (page) {
		        var currentRoute = $location.path().substring(1) || 'home';
		        return page === currentRoute ? 'active' : '';
		    };	
		}])
		.controller('homeCtrl', ['$scope', 'Articles', function($scope, Articles){
			
		}])
		.controller('articlesCtrl', ['$scope', 'Articles', function($scope, Articles){
			Articles.list(function (articles) {
				$scope.articles = articles;
			})
			$scope.showPopup = function(index) {
				$scope.editArticle = angular.copy($scope.articles[index]);
				$scope.editArticleIndex = index;
			};
			$scope.save = function() {
				Articles.update({id: $scope.editArticle._id}, $scope.editArticle, function () {
					var article = $scope.articles[$scope.editArticleIndex];
					article.title = $scope.editArticle.title;
					article.description = $scope.editArticle.description;
					article.group = $scope.editArticle.group;
					$scope.editArticle = null;
					$scope.editArticleIndex = null;
				});
			};
			$scope.visible =  function(index) {
				var article = $scope.articles[index];
				article.visible = !article.visible;
				Articles.update({id: articl._id}, article);
			};
			$scope.delete =  function(index) {
				var articl = $scope.articles[index];

				Articles.delete({id: articl._id}, function () {
					$scope.articles.splice(index, 1);
				});
			};
		}]);
});