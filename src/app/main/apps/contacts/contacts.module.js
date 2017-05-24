(function () {
  'use strict';

  angular
    .module('app.contacts', [])
    .config(Config);

  /** @ngInject */
  function Config($stateProvider, lobiNavigationServiceProvider) {

    $stateProvider
      .state('app.contacts', {
        url: '/contacts',
        views: {
          'content@app': {
            templateUrl: 'app/main/apps/contacts/contacts.html',
            controller: 'ContactsController as vm',
            resolve: {
              Contacts: function ($http) {
                return $http.get('app/main/apps/contacts/data/contacts.json')
                  .then(function (response) {
                    return response.data;
                  }, function (error) {
                    return 'There was an error getting data' + error;
                  });
              }
            }
          }
        },
        bodyClass: 'app-contacts'
      })
    ;

    lobiNavigationServiceProvider.saveItem('app.contacts', {
      text: 'Contacts',
      state: 'app.contacts',
      weight: 1,
      icon: 'fa fa-address-card'
    });
  }
})();
