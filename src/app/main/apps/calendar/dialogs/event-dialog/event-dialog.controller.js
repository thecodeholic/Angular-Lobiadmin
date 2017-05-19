/**
 * Created by george on 5/8/17.
 */
(function () {
  'use strict';

  angular
    .module('app.calendar')
    .controller('EventDialogController', EventDialogControllerFn);

  /** @ngInject */
  function EventDialogControllerFn($uibModalInstance, Event, apiService, $scope) {
    var vm = this;
    // variables
    vm.isEdit = !!Event.title;
    vm.eventStyles = ["event-primary", "event-success", "event-danger", "event-info", "event-warning", "event-gray", "event-cyan", "event-purple", "event-pink"];
    vm.eventDate = {startDate: Event.start, endDate: Event.end};
    vm.event = vm.isEdit ? angular.copy(Event) : {
      id: Math.round(Math.random() * 1000000),
      className: ['event-primary'],
      start: vm.eventDate.startDate,
      end: vm.eventDate.endDate,
      allDay: false
    };
    vm.event.files = vm.event.files || [];
    vm.options = {
      autoUpdateInput: true,
      timePicker: true,
      locale: {format: 'YYYY-MM-DD h:mm A'}
    };


    // Methods
    vm.ok = ok;
    vm.cancel = cancel;
    vm.addAttachments = addAttachments;
    vm.removeAttachment = removeAttachment;
    vm.deleteEvent = deleteEvent;

    init();

    function init() {

      $scope.$watch("vm.event.allDay", function (newValue) {
        vm.options.timePicker = !newValue;
        vm.options.locale.format = !newValue ? 'YYYY-MM-DD h:mm A' : 'YYYY-MM-DD';
      });

      $scope.$watch("vm.eventDate", function (newValue) {
        vm.event.start = newValue.startDate;
        vm.event.end = newValue.endDate;
      });
    }

    function ok() {
      // @todo This code should be tested
      // var eventToSave = angular.copy(vm.event);
      // delete eventToSave.source;
      // apiService.resolve('calendar').save(eventToSave);
      $uibModalInstance.close({
        action: vm.isEdit ? 'edit' : 'add',
        event: vm.event
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function addAttachments(inputEl) {
      angular.forEach(inputEl.files, function (file, ind) {
        vm.event.files.push(file);
      });
      $scope.$apply();
    }

    function removeAttachment(file) {
      vm.event.files.splice(vm.event.files.indexOf(file), 1);
    }

    function deleteEvent() {
      // @todo This code should be tested
      // vm.event.$delete();
      Lobibox.confirm({
        title: 'Deleting event: ' + vm.event.title,
        msg: 'Are you sure you want to delete this event?',
        callback: function (lobibox, btn) {
          if (btn === 'yes') {
            $uibModalInstance.close({
              action: 'delete',
              event: vm.event
            });
          }
        }
      });
    }

  }
})();
