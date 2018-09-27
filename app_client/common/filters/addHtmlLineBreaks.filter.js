(function() {

	angular
		.module('myPlacesApp')
		.filter('addHtmlLineBreaks', addHtmlLineBreaks);

	function addHtmlLineBreaks(){
		return function (text) {
			var output = text.replace(/\n/g, '<br />');
			console.log("addHtmlLineBreaks filter called: " + output);
			return output;
		};
	}
})();