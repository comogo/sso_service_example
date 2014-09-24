(function() {
  var app = angular.module('login', ['field']);

  app.directive('loginForm', ['$http', function($http){
    return {
      restrict: 'E',
      scope: true,

      templateUrl: '/templates/login.html',

      controller: function($scope) {
        $scope.notice = '';
        $scope.error = '';

        function resetForm() {
          $scope.credentials = {
            username: '',
            password: ''
          };
        }

        $scope.submit = function() {
          $scope.notice = '';
          $scope.error = '';

          $http.post("/login", $scope.credentials)
            .success(function(data) {
              $scope.notice = "User logged in: " + data.token;
              resetForm();
            })
            .error(function(data, status) {
              $scope.credentials.password = '';
              $scope.error = "Invalid username or password!";
            });
        };

        $scope.showInvalid = function(field) {
          return field.$invalid;
        };

        resetForm();
      }
    };
  }]);
})();
