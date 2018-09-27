(function() {
	angular
		.module('myPlacesApp')
		.controller('reviewModalCtrl', reviewModalCtrl);

	reviewModalCtrl.$inject = ['$modalInstance', 'locationData'];
	function reviewModalCtrl ($modalInstance, locationData) {
		var vm = this;
		var vm.locationData = locationData;

		vm.modal = {
			cancel: function() {
				$modalInstance.dismiss('cancel');
			}
		};

		vm.onSubmit = function () {
			console.log(vm.formData);
			return false;
		};
	}
})();