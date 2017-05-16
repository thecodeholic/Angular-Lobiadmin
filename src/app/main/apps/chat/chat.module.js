(function () {
  'use strict';

  angular
    .module('app.chat', [])
    .config(Config);

  /** @ngInject */
  function Config($stateProvider, lobiNavigationServiceProvider) {

    $stateProvider
      .state('app.chat', {
        url: '/chat',
        views: {
          'content@app': {
            templateUrl: 'app/main/apps/chat/chat.html',
            controller: 'ChatController as vm'
          }
        },
        bodyClass: 'app-chat'
      })
    ;

    lobiNavigationServiceProvider.saveItem('app.chat', {
      text: 'Chat',
      state: 'app.chat',
      weight: 1
    });
  }
})();
