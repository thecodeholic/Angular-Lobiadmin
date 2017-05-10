/**
 * Created by george on 5/8/17.
 */
(function () {
  'use strict';

  angular
    .module('app.calendar')
    .controller('EventDialogController', EventDialogControllerFn);

  /** @ngInject */
  function EventDialogControllerFn($uibModalInstance, Event, $scope, $log) {
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
        allDay: true,
        title: "",
        description: ""
      };
    console.log(vm.event.allDay);
    // Methods
    vm.chooseFolder = chooseFolder;
    vm.ok = ok;
    vm.cancel = cancel;

    init();
    function init() {
      $scope.$watch("vm.eventDate", function (newValue) {
        if (newValue.endDate == undefined) {
          vm.event.start = newValue;
          vm.event.end = newValue;
        } else {
          vm.event.start = newValue.startDate;
          vm.event.end = newValue.endDate;
        }
      });
      $scope.$watch("vm.event.allDay", function (newValue) {
      });
    }

    function chooseFolder(input) {
      $log.debug(input.files);
    }

    function ok() {
      var isAnagram = true;
      for (var i = 0; i < vm.event.title.length / 2; i++) {
        console.log(vm.event.title[i], "----", vm.event.title[vm.event.title.length - 1 - i]);
        if (vm.event.title[i] != vm.event.title[vm.event.title.length - 1 - i]) {
          isAnagram = false;
        }
      }
      console.log("is anagram : ", isAnagram);

      console.log(vm.event);
      $uibModalInstance.close(vm.event);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();