(function() {
	angular
		.module('myPlacesApp')
		.directive('navigation', navigation);

	function navigation() {
		return {
			retstrict: "EA",
			templateUrl: '/common/directives/navigation/navigation.template.html'
		};
	}
})();