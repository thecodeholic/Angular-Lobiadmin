/**
 * Created by zura on 10/16/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .filter('myDate', myDateFilter);

  /** @ngInject */
  function myDateFilter(DateService) {
    return function (value) {
      if (!value) {
        return value;
      }
      if (!(value instanceof Date)) {
        value = (new Date(value));
      }
      return value.format(DateService.masks.isoDate).replace("EST", "").replace("EDT", "");
    }
  }
})();
