(function () {
  'use strict';

  angular
    .module('app.fileManager', [
      'pascalprecht.translate'
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
            resolve: {
              myFiles: function ($http) {
                return $http.get('app/main/apps/file-manager/data/myFiles.json')
                  .then(function (response) {
                    return response.data;
                  }, function (error) {
                    return 'There was an error getting data' + error;
                  });
              },
              starredFiles: function ($http) {
                return $http.get('app/main/apps/file-manager/data/starredFiles.json')
                  .then(function (response) {
                    return response.data;
                  }, function (error) {
                    return 'There was an error getting data' + error;
                  });
              },
              sharedFiles: function ($http) {
                return $http.get('app/main/apps/file-manager/data/sharedFiles.json')
                  .then(function (response) {
                    return response.data;
                  }, function (error) {
                    return 'There was an error getting data' + error;
                  });
              },
              recentFiles: function ($http) {
                return $http.get('app/main/apps/file-manager/data/recentFiles.json')
                  .then(function (response) {
                    return response.data;
                  }, function (error) {
                    return 'There was an error getting data' + error;
                  });
              },
              offlineFiles: function ($http) {
                return $http.get('app/main/apps/file-manager/data/offlineFiles.json')
                  .then(function (response) {
                    return response.data;
                  }, function (error) {
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
      weight: 10,
      icon: 'fa fa-folder'
    });
  }
})();
