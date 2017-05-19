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
    vm.isEdit = !!Event.id;
    vm.eventStyles = ["primary", "success", "danger", "info", "warning", "gray", "cyan", "purple", "pink"];
    vm.eventDate = {startDate: Event.start, endDate: Event.end};
    vm.event = vm.isEdit ? Event : {
      id: Math.round(Math.random() * 1000000),
      className: ['event_primary'],
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

    function deleteEvent(){
      console.log(vm.event);
      // @todo This code should be tested
      // vm.event.$delete();
      $uibModalInstance.close({
        action: 'delete',
        event: vm.event
      });
    }

  }
})();
