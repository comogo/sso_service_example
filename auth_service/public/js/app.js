(function() {
  var app = angular.module('authApp', []);

  app.controller('MainController', function($scope) {
    this.enableLogin = true;

    this.showSignup = function() {
      this.enableLogin = false;
    };

    this.showLogin = function() {
      this.enableLogin = true;
    };
  });
})();
