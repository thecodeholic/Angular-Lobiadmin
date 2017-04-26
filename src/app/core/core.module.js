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
      'ui.router',
      'toastr',
      'ui.bootstrap',
      'daterangepicker',
      'ngTable'
    ])
    .config(Config);

  /** @ngInject */
  function Config($translateProvider) {
    // angular-translate configuration
    // $translateProvider.useLoader('$translatePartialLoader', {
    //   urlTemplate: '{lang}.json'
    // });
    // $translateProvider.preferredLanguage('en');
    // $translateProvider.useSanitizeValueStrategy('sanitize');

    // $translateProvider.useStaticFilesLoader({
    //   prefix: '',
    //   suffix: '.json'
    // });
    $translateProvider.preferredLanguage('de');

    // Store the language in the local storage
    $translateProvider.useLocalStorage();
  }
})();
