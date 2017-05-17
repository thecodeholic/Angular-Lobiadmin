/**
 * Created by george on 4/28/17.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .directive('omTagsinput', omTagsinputFn);

  /** @ngInject */
  function omTagsinputFn() {
    return {
      restrict: 'A',
      scope: {
        'ngModel': '='
      },
      link: function(scope, elem) {
        var $el = angular.element(elem);
        $el
          .val(scope.ngModel.join(","))
          .tagsinput("items");


        scope.$watch('ngModel', function() {
          if (angular.isString(scope.ngModel)){
            scope.ngModel = scope.ngModel.split(",");
          }
        });
      }
    };
  }
})();
