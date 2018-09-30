(function() {
	angular
		.module('myPlacesApp')
		.controller('reviewModalCtrl', reviewModalCtrl);

	reviewModalCtrl.$inject = ['$uibModalInstance', 'myplacesData', 'locationData'];
	function reviewModalCtrl ($uibModalInstance, myplacesData, locationData) {
		var vm = this;
		vm.locationData = locationData;

		vm.modal = {
			close: function (result) {
				$uibModalInstance.close(result);
			},
			cancel: function() {
				$uibModalInstance.dismiss('cancel');
			}
		};

		vm.onSubmit = function () {
			console.log(vm.formData);
			vm.formError = "";
			if (!vm.formData || !vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
				vm.formError = "All fields required, please try again";
				return false;
			};
			vm.doAddReview(vm.locationData.locationid, vm.formData)
		};

		vm.doAddReview = function (locationid, formData) {
			myplacesData.addReviewById(locationid, {
				author: formData.name,
				rating: formData.rating,
				reviewText: formData.reviewText
			}).then(
				function(data) {
					vm.modal.close(data.data);
					console.log("Success!");	
				},
				function(err) {
					vm.formError = "You review has not been saved, try again";
				}
			);
			return false;
		}
	}
})();