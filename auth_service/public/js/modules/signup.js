(function() {
  var app = angular.module('signup', ['field']);

  app.directive('signupForm', ['$http', function($http) {
    return {
      restrict: 'E',
      scope: true,

      templateUrl: '/templates/signup.html',

      controller: function($scope) {
        $scope.notice = '';
        $scope.error = '';

        function resetForm() {
          $scope.user = {
            name: '',
            email: '',
            username: '',
            password: '',
            password_confirmation: ''
          };
        }

        $scope.submit = function() {
          $scope.notice = '';
          $scope.error = '';

          $http.post("/signup", $scope.user)
            .success(function(data) {
              $scope.notice = "User created!";
              resetForm();
            })
            .error(function(data, status) {
              $scope.error = "Error on create user";
            });
        };

        resetForm();
      }
    };
  }]);
})();
