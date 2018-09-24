(function() {
var _isNumeric = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
var formatDistance = function () {
	return function (distance) {
		var numDistance, unit;
		console.log("formatDistance filter called");
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

angular
	.module("myPlacesApp")
	.filter('formatDistance', formatDistance);
})();