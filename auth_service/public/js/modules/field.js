(function() {
  var app = angular.module('field', []);

  app.directive('formField', function() {
    return {
      restrict: 'E',
      replace: true,

      scope: {
        name: '@',
        label: '@',
        type: '@',
        required: '@',
        ngModel: '='
      },

      templateUrl: '/templates/field.html',

      link: function(scope, element, attr) {
        function capitalize(value) {
          if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
          }
        }

        attr.$observe('required', function(value) {
          scope.required = value || false;

          scope.required_tag = function() {
            if (scope.required) {
              return 'required';
            } else {
              return '';
            }
          }();
        });

        attr.$observe('type', function(value) {
          scope.type = value || 'text';
        });

        attr.$observe('label', function(value) {
          scope.label = value || capitalize(scope.name);
        });
      }
    };
  });
})();
