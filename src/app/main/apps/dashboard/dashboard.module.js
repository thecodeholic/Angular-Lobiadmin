/**
 * Created by zura on 4/11/17.
 */
(function () {
  'use strict';

  angular
    .module('app.dashboard', [])
    .config(Config);

  /** @ngInject */
  function Config($stateProvider, lobiNavigationServiceProvider) {

    $stateProvider
      .state('app.dashboard', {
        url: '/dashboard',
        views: {
          'content@app': {
            templateUrl: 'app/main/apps/dashboard/dashboard.html',
            controller: 'DashboardController as vm',
            resolve: {
            }
          }
        },
        bodyClass: 'app-dashboard'
      })
    ;

    lobiNavigationServiceProvider.saveItem('app.dashboard', {
      text: 'Dashboard',
      translate: 'DASHBOARD.TITLE',
      state: 'app.dashboard',
      weight: 1,
      icon: 'fa fa-dashboard'
    });
  }
})();
