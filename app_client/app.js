angular.module('myPlacesApp', ['ngRoute']);

function config ($routeProvider) {
	console.log("routeProvider is called");
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html'
		})
		.otherwise({redirectTo: '/'});
};

angular
	.module('myPlacesApp')
	.config(['$routeProvider', config]);
