(function() {
  var app = angular.module('authApp', ['login', 'signup']);

  app.controller('MainController', ['$scope', function($scope) {
    this.enableLogin = true;

    this.showSignup = function() {
      this.enableLogin = false;
    };

    this.showLogin = function() {
      this.enableLogin = true;
    };
  }]);
})();
