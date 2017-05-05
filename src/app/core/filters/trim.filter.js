/**
 * Created by zura on 12/31/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .filter('trim', trimFn);

  function trimFn() {
    return function (value) {
      if (!angular.isString(value)) {
        return value;
      }
      return value.replace(/^\s+|\s+$/g, ''); // you could use .trim, but it's not going to work in IE<9
    };
  }
})();
