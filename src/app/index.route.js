(function() {
  'use strict';

  angular
    .module('angularLobiadmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('app', {
        abstract: true,
        views: {
          'main@': {
            templateUrl: 'app/layouts/default.html',
            controller: 'MainController as vm',
            resolve: {
              LoggedIn: function(Auth){
                return Auth.requireSignIn();
              }
            }
          },
          'navigation@app': {
            templateUrl: 'app/navigation/navigation.html',
            controller: 'NavigationController',
            controllerAs: 'vm'
          },
          'toolbar@app': {
            templateUrl: 'app/toolbar/toolbar.html',
            controller: 'ToolbarController',
            controllerAs: 'vm'
          }
        }
      });
  }

})();
