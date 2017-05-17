/**
 * Created by george on 5/10/17.
 */
(function () {
  'use strict';

  angular
    .module('app.calendar')
    .controller('DragDialogController', DragDialogControllerFn);

  /** @ngInject */
  function DragDialogControllerFn($uibModalInstance, entry) {
    var vm = this;
    // variables
    vm.text = entry.text;
    // Methods
    vm.ok = ok;
    vm.cancel = cancel;

    function ok() {
      $uibModalInstance.close();
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();