/**
 * Created by george on 4/24/17.
 */

(function () {
  'use strict';

  angular
    .module('app.core')
    .directive('ngRightClick', ngRightClickFn);

  /** @ngInject */
  function ngRightClickFn($parse) {
    return function (scope, element, attrs) {
      var fn = $parse(attrs.ngRightClick);
      element.bind('contextmenu', function (event) {
        scope.$apply(function () {
          event.preventDefault();
          fn(scope, {$event: event});
        });
      });
    };
  }
})();