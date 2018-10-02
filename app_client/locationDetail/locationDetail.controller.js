(function() {
	angular
		.module('myPlacesApp')
		.controller('locationDetailCtrl', locationDetailCtrl);

	locationDetailCtrl.$inject = ['$routeParams', '$uibModal', 'myplacesData'];
	function locationDetailCtrl($routeParams, $uibModal, myplacesData) {
		var vm = this;
		vm.locationid = $routeParams.locationid;
		console.log("locationDetailCtrl is called for: " + vm.locationid);

		myplacesData.locationById(vm.locationid)
		.then(function(data) {
			vm.data = {
				location: data.data,
				lblOpening: 'Opening hours',
				lblFac: 'Facilities',
				lblLoc: 'Location map',
				lblAddReview: 'Add review',
				reviewtitle: 'Customer reviews',
				key: '',
				sidebar: {
					context: 'is on MyPlaces because it has accessible wifi and space to sit down with your laptop and get some work done.', 
					callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
				}
			};
			vm.pageHeader = {
				title: vm.data.location.name
			};

			vm.popupReviewForm = function() {
				var uibModalInstance = $uibModal.open({
					templateUrl: '/reviewModal/reviewModal.view.html',
					controller: 'reviewModalCtrl as vm',
					resolve: {
						locationData: function() {
							return {
								locationid: vm.locationid,
								locationName: vm.data.location.name
							};
						}
					}
				});

				uibModalInstance.result.then(function(data){
					vm.data.location.reviews.push(data);
				});
			};

			console.log("get data: " + JSON.stringify(vm.data.location));
		}, function(err) {
				console.log(err);
		});
	}
})();
