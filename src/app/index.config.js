(function() {
  'use strict';

  angular
    .module('angularLobiadmin')
    .config(config);

  /** @ngInject */
  function config($logProvider, $windowProvider, $resourceProvider, $translateProvider, $translatePartialLoaderProvider, toastrConfig) {

    var $window = $windowProvider.$get();

    // Enable log
    $logProvider.debugEnabled($window.__env.enableDebug);

    $resourceProvider.defaults.actions.update = {
      method: 'PUT'
    };

    $translateProvider.useSanitizeValueStrategy(null);
    // angular-translate configuration
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '{part}/i18n/{lang}.json'
    });
    $translateProvider.preferredLanguage('en');
    // Translation
    $translatePartialLoaderProvider.addPart('app');
    // Store the language in the local storage
    $translateProvider.useLocalStorage();

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;


    //Overriding default options
    Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
      sound: false,
      size: 'mini',
      position: 'top right',
      delayIndicator: false
    });
  }

})();
