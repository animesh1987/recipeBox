var app = angular.module('mealtrack.controllers.meals', []);


/*********************************************************************
 * MealListCtrl
 *********************************************************************/
app.controller('MealListCtrl', function ($scope, $ionicLoading, MealService) {

	$scope.meals = MealService;

	$ionicLoading.show();
	$scope.meals.load().then(function () {
		$ionicLoading.hide();
	});

	$scope.refreshItems = function () {
		$scope.meals.refresh().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.nextPage = function () {
		$scope.meals.next().then(function () {
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

});

/*********************************************************************
 * MealCreateCtrl
 *********************************************************************/
app.controller('MealCreateCtrl', function ($scope,
                                           $state,
                                           $ionicPopup,
                                           $ionicLoading,
                                           $cordovaCamera,
                                           MealService) {

	$scope.resetFormData = function () {
		$scope.formData = {
			'title': '',
			'category': '',
			'calories': 29,
			'picture': null
		};
	};
	$scope.resetFormData();


	$scope.trackMeal = function (form) {
		if(form.$valid){
      console.log("MealCreateCtrl::trackMeal");
      $ionicLoading.show();
      MealService.track($scope.formData).then(function (res) {
        $scope.resetFormData();
        $ionicLoading.hide();
        form.$setPristine(true);
        $state.go('tab.meals');
      })
    }
	};

	$scope.addPicture = function () {
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA, //PHOTOLIBRARY FOR DEV
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 480,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};


    $cordovaCamera.getPicture(options).then(function (imageData) {
      console.log(imageData);
      $scope.formData.picture = imageData;
    }, function (error) {
      console.log(error);
      $ionicPopup.alert({
        title: 'Error Getting Picture',
        subTitle: 'We had a problem getting your picture, please try again!'
      })
    })


	};

});
