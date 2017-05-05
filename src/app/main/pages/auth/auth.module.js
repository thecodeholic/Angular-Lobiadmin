/**
 * Created by zura on 5/2/17.
 */
(function () {
  'use strict';

  angular
    .module('app.pages.auth', [

      'app.pages.auth.login'
    ])
    .config(Config);

  /** @ngInject */
  function Config($stateProvider) {

    $stateProvider
      .state('auth', {
        abstract: true,
        views: {
          'main@': {
            templateUrl: 'app/layouts/content_only.html',
            controller: 'AuthController as vm',
            resolve: {
              notLoggedIn: ['Auth', function (Auth) {
                return Auth.requireNotSignIn();
              }]
            }
          }
        }
      })
    ;
  }
})();
