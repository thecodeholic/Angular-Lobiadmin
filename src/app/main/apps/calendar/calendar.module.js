(function () {
  'use strict';

  angular
    .module('app.calendar', [
      'ui.calendar'
    ])
    .config(Config);

  /** @ngInject */
  function Config($stateProvider, lobiNavigationServiceProvider, apiServiceProvider) {

    $stateProvider
      .state('app.calendar', {
        url: '/calendar',
        views: {
          'content@app': {
            templateUrl: 'app/main/apps/calendar/calendar.html',
            controller: 'CalendarController as vm',
            resolve: {
              Events: function(apiService){
                return apiService.resolve('calendar').query();
              }
            }
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

    // You will have to update this endpoint url when start building real application
    apiServiceProvider.addResource('calendar', 'main/apps/calendar/data/events.json');
  }
})();
