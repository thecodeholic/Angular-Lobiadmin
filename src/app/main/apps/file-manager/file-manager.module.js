(function () {
  'use strict';

  angular
    .module('app.fileManager', [])
    .config(Config);

  /** @ngInject */
  function Config($stateProvider, lobiNavigationServiceProvider) {

    $stateProvider
      .state('app.fileManager', {
        url: '/file-manager',
        views: {
          'content@app': {
            templateUrl: 'app/main/apps/file-manager/file-manager.html',
            controller: 'FileManagerController as vm'
          }
        },
        bodyClass: 'app-file-manager'
      })
    ;

    lobiNavigationServiceProvider.saveItem('app.fileManager', {
      text: 'File Manager',
      state: 'app.fileManager',
      weight: 1
      // icon: 'fa fa-table'
    });
  }
})();
