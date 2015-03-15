/*
* Controller - assign values to be sent to the views
*/
angular.module('ContactsApp')

	// List all contacts
	.controller('ListController', function ($scope, Contact, $location) {
		$scope.contacts = Contact.query();
		$scope.fields = ['firstName', 'lastName'];

		$scope.sort = function (field) {
			$scope.sort.field = field;
			$scope.sort.order = !$scope.sort.order;
		};

		$scope.sort.field = 'firstName';
		$scope.sort.order = false;

		$scope.show = function (id) {
			$location.url('/contact/' + id);
		};
	})

	// Add a new contact
	.controller('NewController', function ($scope, Contact, $location) {
		$scope.contact = new Contact({
			firstName: ['', 'text'],
			lastName: ['', 'text'],
			email: ['', 'email'],
			homePhone: ['', 'tel'],
			cellPhone: ['', 'tel'],
			birthday: ['', 'date'],
			website: ['', 'url'],
			address: ['', 'text']
		});

		$scope.save = function () {
			if ($scope.newContact.$invalid) {
				$scope.$broadcast('record:invalid');
			} else {
				$scope.contact.$save();
				$location.url('/contacts');
			};
		};
	})

	// View/Edit a contact
	.controller('SingleController', function ($scope, $location, Contact, $routeParams) {
		$scope.contact = Contact.get({ id: parseInt($routeParams.id, 10) });

		$scope.delete = function () {
			$scope.contact.$delete();
			$location.url('/contacts');
		};
	});