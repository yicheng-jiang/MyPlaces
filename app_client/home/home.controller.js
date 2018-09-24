(function() { 
	angular
	.module('myPlacesApp')
	.controller('homeCtrl', homeCtrl);

// function homeCtrl ($scope) {  //+1 remove $scope after using view model +1 add back $scope after using vm
homeCtrl.$inject = ['$scope', 'myplacesData', 'geolocation'];
function homeCtrl ($scope, myplacesData, geolocation) {
	console.log("homeCtrl controller called");
	var vm = this;
	vm.pageHeader = {
		title: 'MyPlaces',
		strapline: 'Find places to work with wifi near you!'
	};
	vm.sidebar = {
		content: "Looking for wifi and a seat etc etc"
	};

	vm.message = "Checking your location";
	vm.getData = function (position) {
		var lat = position.coords.latitude, 
			lng = position.coords.longitude;
		vm.message = "Searching for nearby places";
		myplacesData.locationByCoords(lat, lng)
			.then(function(data) {
				// console.log("data: " + JSON.stringify(data));
				vm.data = {	locations: data.data };
				vm.message = data.data.length > 0 ? "": "No locations found";
				console.log(vm.data);
			}, function (e) {
				vm.message = "Sorry, something's gone wrong";
				console.log(e);
			});	
	};

	vm.showError = function (error) {
		$scope.$apply(function() {
			vm.message = error.message;
		});
	};

	vm.noGeo = function() {
		$scope.$apply(function() {
			vm.message = "Geolocation not supported by this browser.";
		});
	};

	geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);

}
})();