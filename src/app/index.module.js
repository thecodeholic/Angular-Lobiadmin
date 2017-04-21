(function () {
  'use strict';

  angular
    .module('angularLobiadmin', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ui.router',
      'ui.bootstrap',
      'toastr',
      'pascalprecht.translate',
      'ui.bootstrap.contextMenu',
      'app.core',

      'app.pages',

      'app.dashboard',
      'app.fileManager'
    ]);

})();
