/*
* Factories - build resources from the back end API.
*/
angular.module('ContactsApp')
	.factory('Contact', function ($resource) {
		return $resource('/api/contact/:id', { id: '@id' }, {
			'update': { method: 'PUT' }
		});
	});
