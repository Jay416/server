require.config({
    baseUrl: 'javascripts',
    paths: {
        'angular': 'lib/angular',
        'angular-route': 'lib/angular-route',
        'angular-resource': 'lib/angular-resource'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        }
    }
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require(['angular', 'app', 'router'], function (angular, app, router) {
    'use strict'

    angular.element().ready(function() {
        angular.resumeBootstrap([app['name']]);
    });
});