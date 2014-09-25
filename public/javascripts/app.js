define(function (require) {
	'use strict'

	var angular = require('angular');
	require('angular-route');
	require('services');
	require('directives');
	require('filters');
	require('controllers');

	return angular.module('admin', ['ngRoute', 'admin.services', 'admin.directives', 'admin.filters', 'admin.controllers']);
});