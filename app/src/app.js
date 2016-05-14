'use strict';

var app = angular.module('app', [
	'ngMaterial',
	'ngMessages',
	'ngRoute',
	"ngAnimate",
	'ngAria',
	'LocalStorageModule',
	'md.data.table',
	'angularFileUpload',
	'mdPickers',
	'ngclipboard'
]);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/login',{
				templateUrl: 'app/views/login.html',
				controller: 'authController',
				controllerAs: 'auth'
			}).
			 
			when('/order/create',{
				templateUrl: 'app/views/order/create.html',
				controller: 'createOrderController',
				controllerAs: 'createOrder'
			}).
			when('/job/:id',{
				templateUrl: 'app/views/job.html',
				controller: 'jobController',
				controllerAs: 'job'
			}).
			when('/users', {
				templateUrl: 'app/views/users.html',
				controller: 'userController',
				controllerAs: 'users'
			});

			$routeProvider.otherwise({ redirectTo: "/"});
	}
]);

app.config(function($mdThemingProvider) {
	// Configure a dark theme with primary foreground yellow
	$mdThemingProvider.theme('docs-dark', 'default')
	.primaryPalette('grey')
	.dark();
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
}]);


app.config(function($locationProvider) {
	$locationProvider.html5Mode(false);
});


