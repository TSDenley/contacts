/*
* Custom filters
*/
angular.module('ContactsApp')

	// Convert 'camelCase' to 'Lable Case'
	.filter('labelCase', function () {
		return function (input) {
			input = input.replace(/([A-Z])/g, ' $1');
			return input[0].toUpperCase() + input.slice(1);
		};
	})

	// Convert 'Label Case' to 'camelCase'
	.filter('camelCase', function () {
		return function (input) {
			return input.toLowerCase().replace(/ (\w)/g, function(match, letter) {
				return letter.toUpperCase();
			});
		};
	})

	// Filter an object by key.
	// Used to remove duplicate form fields from 'formFields' directive.
	.filter('keyFilter', function () {
		return function (obj, query) {
			var result = {};
			angular.forEach(obj, function (value, key) {
				if (key !== query) {
					result[key] = value;
				};
			});

			return result;
		};
	});