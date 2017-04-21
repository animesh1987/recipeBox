var app = angular.module('mealtrack.controllers.authentication', []);

/*********************************************************************
 * LoginCtrl
 *********************************************************************/
app.controller('LoginCtrl', function ($scope, $state, AuthService) {

	$scope.formData = {
		"email": "",
		"password": ""
	};

	$scope.login = function (form) {
		console.log("LoginCtrl::login");
    if(form.$valid){
      AuthService.login($scope.formData.email, $scope.formData.password).then(function () {
        $state.go('tab.meals');
      });
    }
    else{
      console.log('Invalid Form');
    }
	};

});

/*********************************************************************
 * SignupCtrl
 *********************************************************************/
app.controller('SignupCtrl', function ($scope, $state, AuthService) {

	$scope.formData = {
		"name": "",
		"email": "",
		"password": ""
	};

	$scope.signup = function (form) {
    console.log("SignupCtrl::signup");
    if(form.$valid){
      AuthService.signup($scope.formData.email, $scope.formData.name, $scope.formData.password).then(function () {
        $state.go('tab.meals');
      });
    }
    else{
      console.log('Invalid Form');
    }
  };

});
