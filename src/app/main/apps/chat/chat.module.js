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
            controller: 'ChatController as vm',
            resolve: {
              Users: function ($http) {
                return $http.get('app/main/apps/chat/data/users.json')
                  .then(function (response) {
                    return response.data;
                  }, function (error) {
                    return 'There was an error getting data' + error;
                  });
              },
              Chats: function ($http) {
                return $http.get('app/main/apps/chat/data/chats.json')
                  .then(function (response) {
                    return response.data;
                  }, function (error) {
                    return 'There was an error getting data' + error;
                  });
              }/*,
              Messages: function ($http) {
                return $http.get('app/main/apps/chat/data/messages/3466589652.json')
                  .then(function (response) {
                    return response.data;
                  }, function (error) {
                    return 'There was an error getting data' + error;
                  });
              }*/
            }
          }
        },
        bodyClass: 'app-chat'
      })
    ;

    lobiNavigationServiceProvider.saveItem('app.chat', {
      text: 'Chat',
      state: 'app.chat',
      weight: 1,
      icon: 'fa fa-comments'
    });
  }
})();
