/**
 * Created by george on 5/8/17.
 */
(function () {
  'use strict';

  angular
    .module('app.calendar')
    .controller('EventDialogController', EventDialogControllerFn);

  /** @ngInject */
  function EventDialogControllerFn($uibModalInstance, Event) {
    var vm = this;
    // variables
    vm.isEdit = !!Event.id;
    vm.eventStyles = ["primary", "success", "danger", "info", "warning", "gray", "cyan", "purple", "pink"];

    vm.event = vm.isEdit ? Event : {
        id: vm.id,
        className: "event_primary",
        start: Event.start,
        allDay: true,
        title: "",
        description: ""
    };

    // Methods
    vm.ok = ok;
    vm.cancel = cancel;


    function ok() {
      console.log(vm.event);
      $uibModalInstance.close(vm.event);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();