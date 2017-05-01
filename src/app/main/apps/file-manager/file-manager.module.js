(function () {
  'use strict';

  angular
    .module('app.fileManager', [
      'pascalprecht.translate',
      'cn.offCanvas'
    ])
    .config(Config);

  /** @ngInject */
  function Config($stateProvider, $translateProvider, $translatePartialLoaderProvider, lobiNavigationServiceProvider) {

    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '{part}/i18n/{lang}.json'
    });
    $translateProvider.preferredLanguage('en');
    // $translateProvider.useSanitizeValueStrategy('sanitize');
    // Translation
    $translatePartialLoaderProvider.addPart('app/main/apps/file-manager');

    $stateProvider
      .state('app.fileManager', {
        url: '/file-manager',
        views: {
          'content@app': {
            templateUrl: 'app/main/apps/file-manager/file-manager.html',
            controller: 'FileManagerController as vm',
            resolve:{
              files : function ($http) {
                return $http.get('app/main/apps/file-manager/data/files.json')
                  .then(function(response)
                  {
                    return response.data;
                  }, function(error)
                  {
                    return 'There was an error getting data' + error;
                  });
              }
            }
          }
        },
        bodyClass: 'app-file-manager'
      })
    ;

    lobiNavigationServiceProvider.saveItem('app.fileManager', {
      text: 'File Manager',
      state: 'app.fileManager',
      weight: 1,
      //icon: 'fa fa-table'
    });
  }
})();
