(function () {
  'use strict';

  angular
    .module('app.calendar')
    .controller('CalendarController', CalendarControllerFn);

  /** @ngInject */
  function CalendarControllerFn($uibModal) {
    var vm = this;

    // Data
    vm.availableViews = ["day", "week", "month"];
    vm.currentView = "month";

    vm.events = [
      {
        id: 0,
        title: "event1",
        start: "2017-05-04",
        className: "event_primary",
        description: "Hello World"
      },
      {
        id: 1,
        title: "event2",
        start: "2017-05-04",
        end: "2017-05-09",
        className: "event_danger"
      },
      {
        id: 2,
        title: "event3",
        start: "2017-05-10T12:30:00",
        allDay: false,
        className: "event_success"
      }
    ];

    // Methods
    vm.toggleView = toggleView;
    vm.addNewEvent = addNewEvent;
    vm.editCurrentEvent = editCurrentEvent;

    init();

    ///////////

    function init() {
      $('.om-calendar').fullCalendar({
        dayClick: function (date) {
          addNewEvent(date);
        },

        events: vm.events,

        eventClick: function(event, element) {
          editCurrentEvent(event, element);
        }
      });
    }

    function addNewEvent(date) {
      debugger;
      $uibModal.open({
        templateUrl: 'app/main/apps/calendar/dialogs/event-dialog/event-dialog.html',
        controller: 'EventDialogController',
        controllerAs: 'vm',
        size: 'md',
        resolve: {
          Event: {start:date}
        }
      }).result.then(function (EVENT) {

        vm.events.push(EVENT);
        $('.om-calendar').fullCalendar('renderEvent', EVENT);

        console.log("resolve", arguments);
      }, function () {
        console.log("reject")
      });
    }

    function editCurrentEvent(event, element) {
      $uibModal.open({
        templateUrl: 'app/main/apps/calendar/dialogs/event-dialog/event-dialog.html',
        controller: 'EventDialogController',
        controllerAs: 'vm',
        size: 'md',
        resolve: {
          Event: event
        }
      }).result.then(function (EVENT) {

        event = EVENT;
        $('.om-calendar').fullCalendar('updateEvent', event);

        console.log("resolve", arguments);
      }, function () {
        console.log("reject")
      });
    }

    function toggleView(switchTo) {
      if (switchTo === vm.availableViews[0]) vm.currentView = "day";
      else if (switchTo === vm.availableViews[1]) vm.currentView = "week";
      else if (switchTo === vm.availableViews[2]) vm.currentView = "month";
    }
  }
})();
