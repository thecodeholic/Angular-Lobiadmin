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
    vm.dragMessage = "";

    vm.uiConfig = {
      calendar:{
        editable: true,
        eventLimit: true,
        selectable: true,
        // header:{
        //   left: 'month basicWeek basicDay agendaWeek agendaDay',
        //   center: 'title',
        //   right: 'today prev,next'
        // },
        select: addNewEvent,
        eventClick: editCurrentEvent,
        eventDragStart: catchDragStart,
        eventDrop: showDragDialog,
        // eventResize: $scope.alertOnResize
      }
    };

    vm.events = [
      [
      {
        allDay: true,
        className: ['event_success'],
        description: "Single day event description",
        end: "Tue May 02 2017 04:00:00 GMT+0400 (+04)",
        id: 462399,
        start: "Mon May 01 2017 04:00:00 GMT+0400 (+04)",
        title: "Single day event"
      },
      {
        allDay: false,
        className: ['event_info'],
        description: "Single day event with custom time description",
        end: "Tue May 02 2017 20:00:00 GMT+0400 (+04)",
        id: 180899,
        start: "Tue May 02 2017 17:00:00 GMT+0400 (+04)",
        title: "Single day event with custom time"
      },
      {
        allDay: true,
        className: ['event_danger'],
        description: "Long event description",
        end: "Thu May 11 2017 04:00:00 GMT+0400 (+04)",
        id: 476339,
        start: "Sun May 07 2017 04:00:00 GMT+0400 (+04)",
        title: "Long event"
      },
      {
        allDay: false,
        className: ['event_warning'],
        description: "Long event with custom time description",
        end: "Fri May 18 2017 02:00:00 GMT+0400 (+04)",
        id: 704326,
        start: "Sun May 14 2017 19:00:00 GMT+0400 (+04)",
        title: "Long event with custom time"
      },
      {
        allDay: true,
        className: ['event_pink'],
        description: "Repeating event description",
        end: "Sun May 14 2017 04:00:00 GMT+0400 (+04)",
        id: 778852,
        start: "Fri May 12 2017 04:00:00 GMT+0400 (+04)",
        title: "Repeating event"
      },
      {
        allDay: true,
        className: ['event_pink'],
        description: "Repeating event description",
        end: "Sun May 21 2017 04:00:00 GMT+0400 (+04)",
        id: 778852,
        start: "Fri May 19 2017 04:00:00 GMT+0400 (+04)",
        title: "Repeating event"
      }
    ]
    ];

    // Methods
    vm.toggleView = toggleView;
    vm.addNewEvent = addNewEvent;
    vm.editCurrentEvent = editCurrentEvent;
    vm.showDragDialog = showDragDialog;

    init();

    ///////////

    function init() {
      // $('.om-calendar').fullCalendar({
      //
      //   events: vm.events, //Event List
      //
      //   editable: true, //Allows dragging
      //
      //   eventLimit: true, //Number of events to show per day (others are collapsed)
      //
      //   selectable: true, //Allows selecting multiple dates
      //
      //   select: function (start, end) { //On multiple date select add new event
      //     addNewEvent(start, end);
      //   },
      //
      //   eventClick: function(event, element) { //Event editing on click
      //     editCurrentEvent(event, element);
      //   },
      //
      //   eventDragStart: function(event, delta){ //Event dragging
      //     catchDragStart(event,delta);
      //   },
      //
      //   eventDrop: function (event, delta, revertFunc) { //Event drag finish
      //     showDragDialog(event, delta, revertFunc);
      //   }
      //
      // });
    }

    function addNewEvent(start, end) {
      console.log(start, end);
      $uibModal.open({
        templateUrl: 'app/main/apps/calendar/dialogs/event-dialog/event-dialog.html',
        controller: 'EventDialogController',
        controllerAs: 'vm',
        size: 'md',
        resolve: {
          Event: {start:start, end:end}
        }
      }).result.then(function (EVENT) {

        vm.events.push(EVENT);
        $('.om-calendar').fullCalendar('renderEvent', EVENT);

      }, function () {
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

      }, function () {
      });
    }

    function catchDragStart(event, delta) {
      vm.dragMessage += "Change "+event.title+"'s position from "+event.start.format();
    }
    function showDragDialog(event, delta, revertFunc) {
      console.log(revertFunc);
      vm.dragMessage += " to " + event.start.format()+" ?";
      $uibModal.open({
        templateUrl: 'app/main/apps/calendar/dialogs/drag-dialog/drag-dialog.html',
        controller: 'DragDialogController',
        controllerAs: 'vm',
        size: 'md',
        resolve: {
          entry: {text: vm.dragMessage}
        }
      }).result.then(function () {
        vm.dragMessage = "";
      }, function () {
        vm.dragMessage = "";
        revertFunc();
      });
    }

    function toggleView(switchTo) {
      if (switchTo === vm.availableViews[0]) vm.currentView = "day";
      else if (switchTo === vm.availableViews[1]) vm.currentView = "week";
      else if (switchTo === vm.availableViews[2]) vm.currentView = "month";
    }
  }
})();
