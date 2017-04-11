/**
 * Created by zura on 10/28/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .filter('myTime', myTime);

  /** @ngInject */
  function myTime(DateService) {
    return function (value) {
      if (!value) {
        return value;
      }
      if (!(value instanceof Date)) {
        value = (new Date(value));
      }
      return value.format(DateService.masks.shortTime);
    }
  }
})();
