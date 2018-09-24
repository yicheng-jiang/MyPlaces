(function() {
	var geolocation = function () {
	console.log("geolocation service called");
	var getPosition = function (cbSuccess, cbError, cbNoGeo) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
		} else {
			cbNoGeo();
		}
	};
	return {getPosition : getPosition};
};

angular
	.module('myPlacesApp')
	.service('geolocation', geolocation);
})();
