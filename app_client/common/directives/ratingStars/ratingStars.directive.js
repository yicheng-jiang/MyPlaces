(function() {
	angular
	.module('myPlacesApp')
	.directive('ratingStars', ratingStars)

function ratingStars () {
	console.log("ratingStars filter loaded");
	return {
		scope: {thisRating : '=rating'},
		restrict: 'EA',
		templateUrl: '/common/directives/ratingStars/ratingStars.template.html'
	};
};
})();

