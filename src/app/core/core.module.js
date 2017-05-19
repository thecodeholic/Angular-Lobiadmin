/**
 * Created by zura on 10/27/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core', [
      'pascalprecht.translate',
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ngTagsInput',
      'ui.router',
      'toastr',
      'ui.bootstrap',
      'daterangepicker',
      'ngTable'
    ])
    .config(Config);

  /** @ngInject */
  function Config($translateProvider) {

  }
})();
