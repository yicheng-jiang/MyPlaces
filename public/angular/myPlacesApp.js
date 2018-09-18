angular.module('myPlacesApp', []);

var locationListCtrl = function ($scope, myplacesData, geolocation) {
	$scope.message = "Checking your location";
	$scope.getData = function (position) {
		var lat = position.coords.latitude, 
			lng = position.coords.longitude;
		$scope.message = "Searching for nearby places";
		myplacesData.locationByCoords(lat, lng)
			.then(function(data) {
				console.log("data: " + JSON.stringify(data));
				$scope.data = {	locations: data.data };
				$scope.message = data.data.length > 0 ? "": "No locations found";
			}, function (e) {
				$scope.message = "Sorry, something's gone wrong";
				console.log(e);
			});	
	};

	$scope.showError = function (error) {
		$scope.$apply(function() {
			$scope.message = error.message;
		});
	};

	$scope.noGeo = function() {
		$scope.$apply(function() {
			$scope.message = "Geolocation not supported by this browser.";
		});
	};

	geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

var _isNumeric = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
var formatDistance = function () {
	return function (distance) {
		var numDistance, unit;
		if (distance === 0 || distance && _isNumeric(distance)) {
			if (distance > 1) {
				numDistance = parseFloat(distance).toFixed(1);
				unit = 'km';
			} else {
				numDistance = parseInt(distance * 1000, 10);
				unit = "m";
			}
			return numDistance + unit;
		} else {
			return "?";
		}	
	};
};

var ratingStars = function() {
	return {
		scope: {thisRating : '=rating'},
		templateUrl: '/angular/rating-stars.html'
	};
};

var myplacesData = function($http) {
	var locationByCoords = function (lat, lng) {
		return $http.get('/api/locations?lng='+lng+'&lat='+lat+'&maxDistance=20');
	};
	return {
		locationByCoords : locationByCoords
	};

	/*
	return $http.get('/api/locations?lng=-89.46509724223631&lat=43.062918440240985&maxDistance=20');
	return [{
		name: 'Burger Queen',
		address: '125 High Street, Reading, RG6 1PS',
		rating: 3,
		facilities: ['Hot drinks', 'Food', 'Premium wifi'],
		distance: '0.296456',
		_id: '5370a35f2536f6785f8dfb6a'
	}, {
		name: 'Costy',
		address: '125 High Street, Reading, RG6 1PS',
		rating: 5,
		facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
		distance: '0.7865456',
		_id: '5370a35f2536f6785f8dfb6a'
	}];
	*/
};

var geolocation = function() {
	var getPosition = function (cbSuccess, cbError, cbNoGeo) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
		} else {
			cbNoGeo();
		}
	};
	return {getPosition : getPosition};
};

angular.module('myPlacesApp')
	.controller('locationListCtrl', locationListCtrl)
	.filter('formatDistance', formatDistance)
	.directive('ratingStars', ratingStars)
	.service('myplacesData', myplacesData)
	.service('geolocation', geolocation);
