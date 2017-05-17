(function () {
  'use strict';

  angular
    .module('app.calendar', [
      'ui.calendar'
    ])
    .config(Config);

  /** @ngInject */
  function Config($stateProvider, lobiNavigationServiceProvider) {

    $stateProvider
      .state('app.calendar', {
        url: '/calendar',
        views: {
          'content@app': {
            templateUrl: 'app/main/apps/calendar/calendar.html',
            controller: 'CalendarController as vm'
          }
        },
        bodyClass: 'app-calendar'
      })
    ;

    lobiNavigationServiceProvider.saveItem('app.calendar', {
      text: 'Calendar',
      state: 'app.calendar',
      weight: 5,
      icon: 'fa fa-calendar'
    });
  }
})();
