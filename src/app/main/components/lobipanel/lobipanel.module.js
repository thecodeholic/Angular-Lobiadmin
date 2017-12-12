(function () {
  'use strict';

  angular
    .module('app.components.lobipanel', [])
    .config(Config);

  /** @ngInject */
  function Config($stateProvider, lobiNavigationServiceProvider) {

    $stateProvider
      .state('app.components', {
        abstract: true,
        bodyClass: 'app-components'
      })
      .state('app.components.lobipanel', {
        url: '/components/lobipanel',
        views: {
          'content@app': {
            templateUrl: 'app/main/components/lobipanel/lobipanel.html',
            controller: 'LobipanelController as vm'
          }
        },
        bodyClass: 'app-components-lobipanel'
      })
    ;

    lobiNavigationServiceProvider.saveItem('app.components.lobipanel', {
      text: 'Lobipanel',
      state: 'app.components.lobipanel',
      weight: 1
    });
  }
})();
