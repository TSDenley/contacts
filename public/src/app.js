/*
* Main Angular App file
*/
angular.module('ContactsApp', ['ngRoute', 'ngResource', 'ngMessages'])
	.config(function ($routeProvider, $locationProvider) {

		/*
		* Routing - map URLs to contollers/templates
		*/
		$routeProvider
			.when('/contacts', {
				controller: 'ListController',
				templateUrl: 'views/list.html'
			})
			.when('/contact/new', {
				controller: 'NewController',
				templateUrl: 'views/new.html'
			})
			.when('/contact/:id', {
				controller: 'SingleController',
				templateUrl: 'views/single.html'
			});

		// Use HTML5 URLs and not 'hash-bangs' (#!)
		$locationProvider.html5Mode(true);
	});