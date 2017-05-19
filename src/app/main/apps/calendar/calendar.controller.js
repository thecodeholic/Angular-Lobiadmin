(function () {
  'use strict';

  angular
    .module('app.calendar')
    .controller('CalendarController', CalendarControllerFn);

  /** @ngInject */
  function CalendarControllerFn($uibModal, Events) {
    var vm = this;

    // Data
    vm.availableViews = ["day", "week", "month"];
    vm.currentView = "month";
    vm.dragMessage = "";

    vm.uiConfig = {
      calendar: {
        editable: true,
        droppable: true,
        eventLimit: true,
        businessHours: true,
        buttons: false,
        eventRender: function (event, element) {
          if (event.description) {
            element.append('<span class="fc-description">' + event.description + '</span>');
          }
        },
        selectable: true,
        header: '',
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
      Events
    ];

    // Methods
    vm.toggleView = toggleView;
    vm.addNewEvent = addNewEvent;

    init();

    ///////////

    function init() {

    }

    function addNewEvent(start, end) {
      if (!start) {
        start = moment();
        end = moment().add(1, 'd');
      }
      showEventDialog({start: start, end: end});
    }

    function editCurrentEvent(event) {
      showEventDialog(event);
    }

    function showEventDialog(event) {
      $uibModal.open({
        templateUrl: 'app/main/apps/calendar/dialogs/event-dialog/event-dialog.html',
        controller: 'EventDialogController',
        controllerAs: 'vm',
        size: 'md',
        resolve: {
          Event: event
        }
      }).result.then(function (response) {
        switch (response.action) {
          case 'add':
            vm.events[0].push(response.event);
            break;
          case 'edit':
            for (var i = 0; i < vm.events[0].length; i++) {
              if (response.event.id === vm.events[0][i].id) {
                vm.events[0][i] = angular.extend(vm.events[0][i], response.event);
                break;
              }
            }
            break;
          case 'delete':
            for (var i = 0; i < vm.events[0].length; i++) {
              if (response.event.id === vm.events[0][i].id) {
                vm.events[0].splice(i, 1);
                break;
              }
            }
            break;
          default:
            break;
        }
      });
    }

    function catchDragStart(event, delta) {
      vm.dragMessage += "Change " + event.title + "'s position from " + event.start.format();
    }

    function showDragDialog(event, delta, revertFunc) {
      console.log(revertFunc);
      vm.dragMessage += " to " + event.start.format() + " ?";
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
