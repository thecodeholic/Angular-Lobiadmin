(function() {
  'use strict';

  angular
    .module('angularLobiadmin')
    .config(config);

  /** @ngInject */
  function config($logProvider, $translateProvider, $translatePartialLoaderProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // angular-translate configuration
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '{part}/i18n/{lang}.json'
    });
    $translateProvider.preferredLanguage('en');
    // $translateProvider.useSanitizeValueStrategy('sanitize');
    // Translation
    $translatePartialLoaderProvider.addPart('app');

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
