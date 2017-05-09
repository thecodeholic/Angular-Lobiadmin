/**
 * Created by george on 5/8/17.
 */
(function () {
  'use strict';

  angular
    .module('app.calendar')
    .controller('EventDialogController', EventDialogControllerFn);

  /** @ngInject */
  function EventDialogControllerFn($uibModalInstance, Event, $scope) {
    var vm = this;
    // variables
    vm.isEdit = !!Event.id;
    vm.eventStyles = ["primary", "success", "danger", "info", "warning", "gray", "cyan", "purple", "pink"];
    debugger;
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

    // Methods
    vm.ok = ok;
    vm.cancel = cancel;

    init();
    function init(){
      $scope.$watch("vm.eventDate",function (newValue) {
        if(newValue.endDate == undefined){
          vm.event.start = newValue;
          vm.event.end = newValue;
        }else{
          vm.event.start = newValue.startDate;
          vm.event.end = newValue.endDate;
        }
      });
      $scope.$watch("vm.allDay", function (newValue) {

      });
    }

    function ok() {
      console.log(vm.event);
      $uibModalInstance.close(vm.event);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();