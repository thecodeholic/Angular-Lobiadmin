(function () {
  'use strict';

  angular
    .module('app.pages.auth.login', [])
    .config(Config);

  /** @ngInject */
  function Config($stateProvider, $translatePartialLoaderProvider) {

    $stateProvider
      .state('auth.login', {
        url: '/login',
        views: {
          'content@auth': {
            templateUrl: 'app/main/pages/auth/login/login.html',
            controller: 'LoginController as vm'
          }
        },
        bodyClass: 'page-login'
      })
    ;

    $translatePartialLoaderProvider.addPart('app/main/pages/auth/login');
  }
})();
