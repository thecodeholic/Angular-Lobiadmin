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
            controller: 'ContactsController as vm'
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
