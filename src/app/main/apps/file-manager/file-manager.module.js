(function () {
  'use strict';

  angular
    .module('app.fileManager', [
      'pascalprecht.translate'
    ])
    .config(Config);

  /** @ngInject */
  function Config($stateProvider, $translateProvider, $translatePartialLoaderProvider, apiServiceProvider, lobiNavigationServiceProvider) {

    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '{part}/i18n/{lang}.json'
    });
    $translateProvider.preferredLanguage('en');
    // $translateProvider.useSanitizeValueStrategy('sanitize');
    // Translation
    $translatePartialLoaderProvider.addPart('app/main/apps/file-manager');

    $stateProvider
      .state('app.fileManager', {
        url: '/file-manager/:category?',
        views: {
          'content@app': {
            templateUrl: 'app/main/apps/file-manager/file-manager.html',
            controller: 'FileManagerController as vm',
            resolve: {
              files: ["Files", "$stateParams", function (Files, $stateParams) {
                return Files.get({category: $stateParams.category || 'my'});
              }],
              // starredFiles: ["Files", function (Files) {
              //   return Files.get({category: 'starred'});
              // }],
              // sharedFiles: ["Files", function (Files) {
              //   return Files.get({category: 'shared'});
              // }],
              // recentFiles: ["Files", function (Files) {
              //   return Files.get({category: 'recent'});
              // }],
              // offlineFiles: ["Files", function (Files) {
              //   return Files.get({category: 'offline'});
              // }]
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

    apiServiceProvider.addResource('fileManagerFiles', 'main/apps/file-manager/data/:category-files.json');
  }
})();
