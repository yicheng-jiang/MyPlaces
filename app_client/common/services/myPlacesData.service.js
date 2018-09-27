(function() {
	angular
		.module('myPlacesApp')
		.service('myplacesData', myplacesData);

	myplacesData.$inject = ['$http'];
	function myplacesData($http) {
		console.log("myplacesData service called");
		var locationByCoords = function (lat, lng) {
			return $http.get('/api/locations?lng='+lng+'&lat='+lat+'&maxDistance=20');
		};

		var locationById = function (locationid) {
			return $http.get('/api/locations/' + locationid);
		};

		return {
			locationByCoords : locationByCoords,
			locationById: locationById
		};
	};
})();