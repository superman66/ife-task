'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'myApp.index'
]).
config(['$routeProvider', function($routeProvider){
    $routeProvider.otherwise({redirectTo : '/index'});
}]);